import { useEffect, useState } from "react"
import {
    Text,
    Span,
    Embed,
    Title,
    ActionRow,
    Button,
    LinkButton,
    Select,
    Option,
    Color,
} from "reaccord"

export const Counter = () => {
    const [increment, setIncrement] = useState(1)
    const [count, setCount] = useState(0)

    return (
        <>
            {/* <Text>
                Count: <Span bold>{count}</Span>
            </Text> */}
            <Embed>
                <Title>Count: {count}</Title>
                <Color color="RANDOM" />
            </Embed>
            <ActionRow>
                <Button
                    emoji={{ name: "➕" }}
                    onClick={() => {
                        setCount((count) => count + increment)
                    }}
                    style="PRIMARY"
                    customId="plusbtn"
                >
                    {increment}
                </Button>
                <Button
                    emoji={{ name: "➖" }}
                    onClick={() => {
                        setCount((count) => count - increment)
                    }}
                    style="SECONDARY"
                    customId="minusbtn"
                >
                    {increment}
                </Button>
                <LinkButton href="https://dvmm.dev">dvmm.dev{count}</LinkButton>
            </ActionRow>
            <ActionRow>
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
            </ActionRow>
        </>
    )
}
