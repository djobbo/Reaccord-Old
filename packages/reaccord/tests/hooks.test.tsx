import {
    Author,
    Br,
    Button,
    Code,
    Color,
    Desc,
    Embed,
    Field,
    Footer,
    Image,
    Link,
    LinkButton,
    Option,
    InteractionRow,
    Select,
    Span,
    Text,
    Timestamp,
    Title,
    Url,
} from ".."
import { useEffect, useState } from "react"
import { renderMessage } from "../src/renderMessage"
import { Container } from "../src/types"

describe("Hooks", () => {
    test("useState hook", (done) => {
        const mockUpdateFn = async (message) => {
            expect(message).toEqual<Container["content"]>({
                components: [],
                embeds: [],
                text: { content: "initial" },
            })
            done()
        }

        const TestMessage = () => {
            const [msg, setMsg] = useState("initial")

            return <Text>{msg}</Text>
        }

        expect(() =>
            renderMessage(<TestMessage />, null, mockUpdateFn),
        ).not.toThrow()
    })

    test("useEffect hook", (done) => {
        let timesCalled = 0

        const mockUpdateFn = (payload: string) => {
            expect(timesCalled).toBe(0)
            expect(payload).toBe("update")
            done()
        }

        const TestMessage = () => {
            useEffect(() => {
                mockUpdateFn("update")
            }, [])

            return <Text>initial</Text>
        }

        expect(() => renderMessage(<TestMessage />)).not.toThrow()
    })

    it("useState + useEffect hooks", (done) => {
        let timesCalled = 0

        const mockUpdateFn = async (message) => {
            if (timesCalled === 0) {
                expect(message).toEqual<Container["content"]>({
                    components: [],
                    embeds: [],
                    text: { content: "initial" },
                })
                timesCalled++
            } else if (timesCalled === 1) {
                expect(message).toEqual<Container["content"]>({
                    components: [],
                    embeds: [],
                    text: { content: "changed" },
                })
                done()
            }
        }

        const TestMessage = () => {
            const [msg, setMsg] = useState("initial")

            useEffect(() => {
                setMsg("changed")
            }, [])

            return <Text>{msg}</Text>
        }

        expect(() =>
            renderMessage(<TestMessage />, null, mockUpdateFn),
        ).not.toThrow()
    })

    // TODO: Unmount
})
