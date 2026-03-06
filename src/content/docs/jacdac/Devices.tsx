import { JDDevice, JDService, SRV_BUTTON, ButtonReg } from "jacdac-ts"
import { JacdacProvider, useDevices, useRegister, useRegisterValue } from 'react-jacdac'
import ConnectButton, { bus } from "./ConnectButton"
import React from "react"

const DemoRegister = (props: { device: JDDevice; identifier: number; service: JDService }) => {
    const { device, identifier, service } = props
    const register = useRegister(service, identifier)
    const value = useRegisterValue(register)
    return <span style={{ marginLeft: "0.5rem" }}>{device.name} {register.name} {value}</span>
}

const Demo = () => {
    const devices: JDDevice[] = useDevices({
        announced: true,
        ignoreInfrastructure: true,
    })

    return (
        <>
            <ConnectButton />
            <p>devices: {devices.length}</p>
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
            <p>Try pressing buttons!</p>
                {devices.filter(d => d.hasService(SRV_BUTTON)).map(device => (
                    <DemoRegister key={device.id} device={device} identifier={ButtonReg.Pressure} 
                        service={device.services()[1]} />
                ))}
        </>
    )
}


export default () => (
    <JacdacProvider initialBus={bus}>
        <Demo  />
    </JacdacProvider>
)