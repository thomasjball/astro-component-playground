import { JacdacProvider, useDevices } from 'react-jacdac'
import ConnectButton, { bus } from "./ConnectButton"

const Demo = () => {
    const devices = useDevices({})
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