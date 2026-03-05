import { JDDevice, JDService, SRV_BUTTON, SRV_CONTROL, CHANGE } from "jacdac-ts"
import { JacdacProvider, useDevices } from 'react-jacdac'
import ConnectButton, { bus } from "./ConnectButton"
import React, { useState } from "react"

const Demo = () => {
    const devices = useDevices({
        announced: true,
        ignoreInfrastructure: true,
    })

    const getServices = (device: JDDevice) => device.services() as JDService[]

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