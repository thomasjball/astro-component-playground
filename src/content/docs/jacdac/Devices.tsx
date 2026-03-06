import { JDDevice, JDService, SRV_BUTTON, ButtonReg } from "jacdac-ts"
import { JacdacProvider, useDevices, useRegister, useRegisterValue, useRoles, useServices } from 'react-jacdac'
import ConnectButton, { bus } from "./ConnectButton"
import { useServiceProvider } from "./useServiceProvider"
import React from "react"

const DemoRegister = (props: { device: JDDevice; identifier: number; service: JDService }) => {
    const { device, identifier, service } = props
    const register = useRegister(service, identifier)
    const value = useRegisterValue(register)
    return <li style={{ marginLeft: "0.5rem" }}>{device.name} {register.name} {value}</li>
}

const DemoRoles = () => {
    const {
        roles: { button1, button2, button3 },
    } = useRoles({
        button1: { serviceClass: SRV_BUTTON },
        button2: { serviceClass: SRV_BUTTON },
        button3: { serviceClass: SRV_BUTTON },
    })
    useServiceProvider({ serviceClass: SRV_BUTTON })

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

    return (
        <>
            <ConnectButton />
            <h3>devices: {devices.length}</h3>
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
            <h3>Try pressing buttons!</h3>
                <ul>
                {devices.filter(d => d.hasService(SRV_BUTTON)).map(device => (
                    <DemoRegister key={device.id} device={device} identifier={ButtonReg.Pressure} 
                        service={device.services()[1]} />
                ))}
            </ul>
            <h3>Roles:</h3>
            <DemoRoles />
        </>
    )
}


export default () => (
    <JacdacProvider initialBus={bus}>
        <Demo  />
    </JacdacProvider>
)