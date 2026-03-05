import { JDDevice, JDService, SRV_BUTTON, SRV_CONTROL, CHANGE } from "jacdac-ts"
import { JacdacProvider, useDevices } from 'react-jacdac'
import ConnectButton, { bus } from "./ConnectButton"
import React from "react"

const Demo = () => {
    const devices = useDevices({
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
                                <li key={service.id}>service {service.name}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default () => (
    <JacdacProvider initialBus={bus}>
        <Demo  />
    </JacdacProvider>
)