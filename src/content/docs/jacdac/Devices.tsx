import { JDDevice, JDService, SRV_BUTTON, SRV_CONTROL, CHANGE } from "jacdac-ts"
import { JacdacProvider, useDevices } from 'react-jacdac'
import ConnectButton, { bus } from "./ConnectButton"
import React, { useState } from "react"

const Demo = () => {
    const [devices, setDevices] = useState<JDDevice[]>([])

    const getServices = (device: JDDevice) => device.services() as JDService[]

    bus.on(CHANGE, () => {
        setDevices(bus.devices())
    })
    return (
        <>
            <ConnectButton />
            <p>devices: {devices.length}</p>
            <ul>
                {devices.map(device => (
                    <li key={device.id}>device {device.describe()}</li>
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