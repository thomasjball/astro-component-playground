import { JDService, LedReg } from "jacdac-ts"
import { useState } from "react"

enum TestState {
    Idle,
    Running,
    Pass,
    Fail,
}
type Test = {
    state: TestState
    output: string
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function test(service: JDService) {
    const test = {
        state: TestState.Running,
        output: "ok",
    }
    const testColors = [0xff0000, 0x00ff00, 0x0000ff]
    const pixelsRegister = service.register(LedReg.Pixels)
    const numPixelsRegister = service.register(LedReg.NumPixels)
    let n: number = undefined
    while (n === undefined) {
        await numPixelsRegister.refresh(true)
        n = numPixelsRegister.uintValue
    }
    if (n == 0) {
        test.state = TestState.Fail
        test.output = "no pixels found"
        return
    }
    // cycle through color and turn on pixels one by one
    const pixels = new Uint8Array(n * 3)
    let k = 0
    while (k < testColors.length) {
        // factory test: render all leds
        const color = testColors[k++ % testColors.length]
        for (let i = 0; i < n; ++i) {
            pixels[i * 3] = (color >> 16) & 0xff
            pixels[i * 3 + 1] = (color >> 8) & 0xff
            pixels[i * 3 + 2] = (color >> 0) & 0xff
        }
        await pixelsRegister.sendSetPackedAsync([pixels], true)
        await delay(500)
    }
    test.state = TestState.Pass
    test.output = "test passed"
}

export default ({service}: {service: JDService}) => {
    // on react button press, run led test
    const [testState, setTestState] = useState<Test>({
        state: TestState.Idle,
        output: "",
    })
    const runTest = async () => {
        setTestState({ state: TestState.Running, output: "Running test..." })
        try {
            await test(service)
            setTestState({ state: TestState.Pass, output: "Test passed!" })
        } catch (e) {
            setTestState({ state: TestState.Fail, output: "Test failed!" })
        }
    }
    return (
        <div>
            <button onClick={runTest} disabled={testState.state == TestState.Running}>
                Run LED test
            </button>
            <p>{testState.output}</p>
        </div>
    )
}   