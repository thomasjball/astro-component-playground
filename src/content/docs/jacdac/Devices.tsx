import { JDDevice, JDService, SRV_LED, SRV_BUTTON, ButtonReg, ButtonEvent, CHANGE } from "jacdac-ts"
import { SRV_LIGHT_LEVEL, SystemReg } from "jacdac-ts"
import { SRV_POTENTIOMETER, PotentiometerReg } from "jacdac-ts"
import { SRV_ROTARY_ENCODER } from "jacdac-ts"
import { SRV_MAGNETIC_FIELD_LEVEL } from "jacdac-ts"
import { JacdacProvider, useDevices, useRegister, useRegisterValue, useRoles, useServices, useEvent } from 'react-jacdac'
import ConnectButton, { bus } from "./ConnectButton"
import { useState, useEffect } from "react"
import LedRing from "./LedRing"


const sensors = [
    { serviceClass: SRV_LIGHT_LEVEL, reg: SystemReg.Reading },
    { serviceClass: SRV_POTENTIOMETER, reg: PotentiometerReg.Position },
    { serviceClass: SRV_ROTARY_ENCODER, reg: SystemReg.Reading },
    { serviceClass: SRV_MAGNETIC_FIELD_LEVEL, reg: SystemReg.Reading },
]

const DemoRegister = (props: { device: JDDevice; identifier: number; service: JDService }) => {
    const { device, identifier, service } = props
    const register = useRegister(service, identifier)
    const value = useRegisterValue(register)
    return <li style={{ marginLeft: "0.5rem" }}>{device.name} {register.name} {value}</li>
}

const DemoEvent = (props: { device: JDDevice; identifier: number; service: JDService }) => {
    const { device, identifier, service } = props
    const event = useEvent(service, identifier)
    const [count, setCount] = useState(event?.count || 0)
    useEffect(
        () =>
            event?.subscribe(CHANGE, () => {
                setCount(event.count)
            }),
        [event]
    )
    return <li style={{ marginLeft: "0.5rem" }}>{device.name} {event?.name} {count}</li>
}


const DemoRoles = () => {
    const {
        roles: { button1, button2, button3 },
    } = useRoles({
        button1: { serviceClass: SRV_BUTTON },
        button2: { serviceClass: SRV_BUTTON },
        button3: { serviceClass: SRV_BUTTON },
    })
    // this creates a simulated button service provider
    // useServiceProvider({ serviceClass: SRV_BUTTON })

    const buttons = useServices({ serviceClass: SRV_BUTTON })
    return (
        <>
            <ul>
                <li>button1: {button1?.toString() || "unbound"}</li>
                <li>button2: {button2?.toString() || "unbound"}</li>
                <li>button3: {button3?.toString() || "unbound"}</li>
            </ul>
        </>
    )
}

const Demo = () => {
    const devices: JDDevice[] = useDevices({
        announced: true,
        ignoreInfrastructure: true,
    })

    const ledRingServices = useServices({ serviceClass: SRV_LED })

    return (
        <>
            <ConnectButton />
            <h3>Devices (and their services): {devices.length}</h3>
            <ul>
                {devices.map(device => (
                    <li key={device.id}>device {device.describe()}
                        <ul>
                            {device.services().map((service: JDService) => (
                                <li key={service.id}>service {service.friendlyName} {service.specification.name}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            <h3>Register value (ButtonReg.Pressure)</h3>
                <ul>
                {devices.filter(d => d.hasService(SRV_BUTTON)).map(device => (
                    <DemoRegister key={device.id} device={device} identifier={ButtonReg.Pressure} 
                        service={device.services().find(s => s.serviceClass === SRV_BUTTON)} />
                ))}
            </ul>
            <h3>Event count (ButtonEvent.Up)</h3>
                <ul>
                {devices.filter(d => d.hasService(SRV_BUTTON)).map(device => (
                    <DemoEvent key={device.id} device={device} identifier={ButtonEvent.Up} 
                        service={device.services().find(s => s.serviceClass === SRV_BUTTON)} />
                ))}
            </ul>
            <h3>Other sensors</h3>
            <ul>
                {sensors.map((sensor, index) => 
                    devices.filter(d => d.hasService(sensor.serviceClass)).map(device => (
                        <DemoRegister key={`${device.id}-${index}`} device={device} identifier={sensor.reg} 
                            service={device.services().find(s => s.serviceClass === sensor.serviceClass)!} />
                    ))
                )}
            </ul>
            <h3>Roles assignments</h3>
            <DemoRoles />
            <h3>LED ring test</h3>
            { ledRingServices.length > 0 ?
            <>
                <LedRing service={ledRingServices[0]} />
            </> : <p>Add an LED ring to the Jacdac bus...</p>
            }
        </>
    )
}


export default () => (
    <JacdacProvider initialBus={bus}>
        <Demo  />
    </JacdacProvider>
)