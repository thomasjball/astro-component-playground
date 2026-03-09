
import React, { useState } from "react"
import { createUSBBus } from "jacdac-ts"
import { JDBus, Transport, ConnectionState } from "jacdac-ts"
import { useChange } from "react-jacdac"

export let bus: JDBus = createUSBBus()
bus.streaming = true

export default function ConnectButton() {
    const transport = bus.transports[0] as Transport
    const type  = "WebUSB" // transport.type
    const connectionState = useChange(transport, t => t.connectionState)
    const showDisconnect =
        connectionState == ConnectionState.Connected ||
        connectionState == ConnectionState.Disconnecting
    const inProgress =
        connectionState == ConnectionState.Connecting ||
        connectionState == ConnectionState.Disconnecting
    const disabled =
        connectionState != ConnectionState.Connected &&
        connectionState != ConnectionState.Disconnected

    const handleClick = showDisconnect
        ? async () => {
              await transport.disconnect()
          }
        : async () => {
              await transport.connect()
          }

    const label = showDisconnect
        ? `disconnect from ${type}`
        : `connect to ${type}`

    return (
        <button
            style={{ marginRight: "0.5rem" }}
            onClick={handleClick}
            disabled={disabled}
        >
            {label}
        </button>
    )
}
