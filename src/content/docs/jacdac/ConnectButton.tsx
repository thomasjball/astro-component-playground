
import React, { useState } from "react"
import { createUSBBus, CONNECTION_STATE } from "jacdac-ts"
import { JDBus } from "jacdac-ts"

export let bus: JDBus = createUSBBus()
bus.streaming = true

export default function ConnectButton() {
    const [connected, setConnected] = useState(false)
    bus.on(CONNECTION_STATE, () => { 
        setConnected(bus.connected)
    })
    return (
        <button
            style={{ marginRight: "0.5rem" }}
            onClick={async () => {
                await bus.disconnect()
                await bus.connect()
            }}
        >
            {connected ? `connected` : `disconnected`}
        </button>
    )
}
