import { useState } from "react"
import { Text, InteractionRow, Button, LinkButton } from "reaccord"

export const Counter = () => {
    const [count, setCount] = useState(0)

    return (
        <>
            <Text>Count: {count}</Text>
            <InteractionRow>
                <Button
                    emoji={{ name: "➕" }}
                    onClick={() => {
                        setCount((count) => count + 1)
                    }}
                    style="Primary"
                    customId="plusbtn"
                />
                <Button
                    emoji={{ name: "➖" }}
                    onClick={() => {
                        setCount((count) => count - 1)
                    }}
                    style="Secondary"
                    customId="minusbtn"
                />
                <LinkButton href="https://dvmm.dev">dvmm.dev</LinkButton>
            </InteractionRow>
        </>
    )
}
