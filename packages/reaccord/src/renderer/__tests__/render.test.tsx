import { renderMessage } from ".."
import { Container } from "../hostConfig"
import { Text } from "../nodes"

describe("renders message", () => {
    it("creates empty message", () => {
        expect(() => renderMessage(<></>)).not.toThrow()

        const mockUpdateFn = jest.fn()

        renderMessage(<></>, { onUpdate: mockUpdateFn })

        expect(mockUpdateFn).toHaveBeenCalledTimes(1)

        expect(mockUpdateFn).toHaveBeenCalledWith<[Container["content"]]>({
            components: [],
            embeds: [],
            text: { content: "" },
        })
    })

    // it("only accepts the right children", () => {
    //     expect(() => renderMessage("abc")).toThrow()
    //     expect(() => renderMessage(<>abc</>)).toThrow()
    //     expect(() => renderMessage(<Author>abc</Author>)).toThrow()
    //     expect(() => renderMessage(<Br />)).toThrow()
    //     expect(() =>
    //         renderMessage(<Button customId="custom">Hi</Button>),
    //     ).toThrow()
    //     expect(() => renderMessage(<Code lang="js">some code</Code>)).toThrow()
    //     expect(() => renderMessage(<Color hex="#eee" />)).toThrow()
    //     expect(() => renderMessage(<Desc></Desc>)).toThrow()
    //     expect(() => renderMessage(<Embed></Embed>)).not.toThrow()
    //     expect(() =>
    //         renderMessage(<Field title="my field">a field</Field>),
    //     ).toThrow()
    //     expect(() => renderMessage(<Footer></Footer>)).toThrow()
    //     expect(() => renderMessage(<Image url="some_img_url" />)).toThrow()
    //     expect(() =>
    //         renderMessage(<Link href="https://dvmm.dev">DVMM</Link>),
    //     ).toThrow()
    //     expect(() =>
    //         renderMessage(
    //             <LinkButton href="https://dvmm.dev">DVMM</LinkButton>,
    //         ),
    //     ).toThrow()
    //     expect(() =>
    //         renderMessage(<Option value="value">name</Option>),
    //     ).toThrow()
    //     expect(() => renderMessage(<ActionRow></ActionRow>)).toThrow()
    //     expect(() =>
    //         renderMessage(
    //             <Select customId="select" placeholder="hellow"></Select>,
    //         ),
    //     ).toThrow()
    //     expect(() => renderMessage(<Span>hello</Span>)).toThrow()
    //     expect(() => renderMessage(<Text>hi</Text>)).not.toThrow()
    //     expect(() =>
    //         renderMessage(<Timestamp timestamp={new Date()} />),
    //     ).toThrow()
    //     expect(() => renderMessage(<Title>Title</Title>)).toThrow()
    //     expect(() =>
    //         renderMessage(<Url href="https://dvmm.dev">DVMM</Url>),
    //     ).toThrow()
    // })
})

describe("renders text message", () => {
    it("creates text message", () => {
        expect(() => renderMessage(<Text>s</Text>)).not.toThrow()

        const mockUpdateFn = jest.fn()

        renderMessage(<Text>qwerty</Text>, { onUpdate: mockUpdateFn })

        expect(mockUpdateFn).toHaveBeenCalledTimes(1)
        expect(mockUpdateFn).toHaveBeenCalledWith<[Container["content"]]>({
            components: [],
            embeds: [],
            text: { content: "qwerty" },
        })
    })
})
