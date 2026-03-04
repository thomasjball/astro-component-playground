import { SRV_BUTTON } from "jacdac-ts"
import React from "react"
import { JacdacProvider, useRoles, useServices, useDevices } from 'react-jacdac'
import { useServiceProvider } from "./useServiceProvider"
import SimulatorToolbar from  "./SimulatorToolbar"
import ConnectButton, { bus } from "./ConnectButton"

const Demo = () => {
    const {
        roles: { button1, button2, button3 },
    } = useRoles({
        button1: { serviceClass: SRV_BUTTON },
        button2: { serviceClass: SRV_BUTTON },
        button3: { serviceClass: SRV_BUTTON },
    })
    useServiceProvider({ serviceClass: SRV_BUTTON })
    const devices = useDevices({})

    const buttons = useServices({ serviceClass: SRV_BUTTON })
    return (
        <>
            <ConnectButton />
            <p>devices: {devices.length}</p>
            <ul>
                {devices.map(device => (
                    <li key={device.id}>device {device.describe()}</li>
                ))}
            </ul>
            <SimulatorToolbar />
            <p>buttons:</p>
            <ul>
                {buttons?.map(button => (
                    <li key={button.id}>{button.toString()}</li>
                ))}
            </ul>
            <p>roles:</p>
            <ul>
                <li>button1: {button1?.toString() || "unbound"}</li>
                <li>button2: {button2?.toString() || "unbound"}</li>
                <li>button3: {button3?.toString() || "unbound"}</li>
            </ul>
        </>
    )
}

export default () => (
    <JacdacProvider initialBus={bus}>
        <Demo  />
    </JacdacProvider>
)