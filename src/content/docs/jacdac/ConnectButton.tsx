
import React, { useState } from "react"
import { createWebBus } from "jacdac-ts"
import { JDBus } from "jacdac-ts"

export let bus: JDBus = new JDBus()

export default function ConnectButton() {
    const initialState = false
    const [on, setOn] = useState(!!initialState)

    return (
        <button
            style={{ marginRight: "0.5rem" }}
            onClick={() => { setOn(o => !o); 
                bus = createWebBus();
                bus.connect();

            }}
        >
            {on ? `connected` : `disconnected`}
        </button>
    )
}
