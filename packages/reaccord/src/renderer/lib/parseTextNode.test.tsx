import { Link, Span } from "../nodes"
import { parseTextNode } from "."

describe("renders text message", () => {
    it("parses text node", () => {
        expect(parseTextNode(<></>)).toBe("")
        expect(parseTextNode(<>hello</>)).toBe("hello")
        expect(parseTextNode(<Span>hello</Span>)).toBe("hello")
        expect(parseTextNode(<Span bold>hello</Span>)).toBe("**hello**")
        expect(parseTextNode(<Span italic>hello</Span>)).toBe("*hello*")
        expect(
            parseTextNode(
                <Span bold italic>
                    hello
                </Span>,
            ),
        ).toBe("***hello***")
        expect(parseTextNode(<Link href="https://dvmm.dev/">hello</Link>)).toBe(
            "[hello](https://dvmm.dev/)",
        )
    })
})
