import { useState } from "react"
import {
    Text,
    InteractionRow,
    Button,
    LinkButton,
    Select,
    Option,
    Span,
} from "reaccord"

export const Counter = () => {
    const [increment, setIncrement] = useState(1)
    const [count, setCount] = useState(0)

    return (
        <>
            <Text>
                Count: <Span bold>{count}</Span>
            </Text>
            <InteractionRow>
                <Button
                    emoji={{ name: "➕" }}
                    onClick={() => {
                        setCount((count) => count + increment)
                    }}
                    style="Primary"
                    customId="plusbtn"
                >
                    {increment}
                </Button>
                <Button
                    emoji={{ name: "➖" }}
                    onClick={() => {
                        setCount((count) => count - increment)
                    }}
                    style="Secondary"
                    customId="minusbtn"
                >
                    {increment}
                </Button>
                <LinkButton href="https://dvmm.dev">dvmm.dev</LinkButton>
            </InteractionRow>
            <Select
                customId="myselect"
                placeholder=""
                onChange={(value) => {
                    setIncrement(parseInt(value))
                }}
                single
            >
                {[1, 10, 100, 1000].map((val) => (
                    <Option
                        value={val.toString()}
                        selected={increment === val}
                        description={<>Set increment to {val}</>}
                        key={val}
                    >
                        {val}
                    </Option>
                ))}
            </Select>
        </>
    )
}
