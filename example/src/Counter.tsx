import { useEffect, useState } from "react"
import {
    Text,
    Span,
    Embed,
    Title,
    ActionRow,
    Button,
    LinkButton,
} from "reaccord"

export const Counter = () => {
    const [increment, setIncrement] = useState(1)
    const [count, setCount] = useState(0)

    useEffect(() => {
        const t = setTimeout(() => setCount(10), 500)
        return () => clearTimeout(t)
    }, [])

    return (
        <>
            <Text>
                Count: <Span bold>{count}</Span>
            </Text>
            <Embed>
                <Title>{count}</Title>
            </Embed>
            <ActionRow>
                <Button
                    emoji="➕"
                    onClick={() => {
                        setCount((count) => count + increment)
                    }}
                    style="PRIMARY"
                    customId="plusbtn"
                >
                    {increment}
                </Button>
                <Button
                    emoji="➖"
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
            {/* <Select
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
            </Select> */}
        </>
    )
}
