import { useState } from "react"
import { Text, Row, Button, LinkButton } from "reaccord"

export const Counter = () => {
    const [count, setCount] = useState(0)

    return (
        <>
            <Text>Count: {count}</Text>
            <Row>
                <Button
                    emoji={{ name: "➕" }}
                    onClick={() => {
                        setCount((count) => count + 1)
                    }}
                    style="Primary"
                    customId="plusbtn"
                ></Button>
                <Button
                    emoji={{ name: "➖" }}
                    onClick={() => {
                        setCount((count) => count - 1)
                    }}
                    style="Secondary"
                    customId="minusbtn"
                ></Button>
                <LinkButton href="https://dvmm.dev">dvmm.dev</LinkButton>
            </Row>
        </>
    )
}
