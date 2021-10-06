import { Container, renderMessage, parseTextNode } from '../src/Reaccord';
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
	Row,
	Select,
	Span,
	Text,
	Timestamp,
	Title,
	Url,
} from '../';
import { useEffect, useState } from 'react';

describe('renders message', () => {
	it('creates empty message', () => {
		expect(() => renderMessage(<></>)).not.toThrow();

		const mockUpdateFn = jest.fn();

		renderMessage(<></>, null, mockUpdateFn);

		expect(mockUpdateFn).toHaveBeenCalledTimes(1);

		expect(mockUpdateFn).toHaveBeenCalledWith<[Container['content']]>({
			components: [],
			embeds: [],
			text: { content: '' },
		});
	});

	// it('only accepts the right children', () => {
	// 	expect(() => renderMessage('abc')).toThrow();
	// 	expect(() => renderMessage(<>abc</>)).toThrow();
	// 	expect(() => renderMessage(<Author>abc</Author>)).toThrow();
	// 	expect(() => renderMessage(<Br />)).toThrow();
	// 	expect(() =>
	// 		renderMessage(<Button customId='custom'>Hi</Button>)
	// 	).toThrow();
	// 	expect(() => renderMessage(<Code lang='js'>some code</Code>)).toThrow();
	// 	expect(() => renderMessage(<Color hex='#eee' />)).toThrow();
	// 	expect(() => renderMessage(<Desc></Desc>)).toThrow();
	// 	expect(() => renderMessage(<Embed></Embed>)).not.toThrow();
	// 	expect(() =>
	// 		renderMessage(<Field title='my field'>a field</Field>)
	// 	).toThrow();
	// 	expect(() => renderMessage(<Footer></Footer>)).toThrow();
	// 	expect(() => renderMessage(<Image url='some_img_url' />)).toThrow();
	// 	expect(() =>
	// 		renderMessage(<Link href='https://dvmm.dev'>DVMM</Link>)
	// 	).toThrow();
	// 	expect(() =>
	// 		renderMessage(<LinkButton href='https://dvmm.dev'>DVMM</LinkButton>)
	// 	).toThrow();
	// 	expect(() =>
	// 		renderMessage(<Option value='value'>name</Option>)
	// 	).toThrow();
	// 	expect(() => renderMessage(<Row></Row>)).toThrow();
	// 	expect(() =>
	// 		renderMessage(
	// 			<Select customId='select' placeholder='hellow'></Select>
	// 		)
	// 	).toThrow();
	// 	expect(() => renderMessage(<Span>hello</Span>)).toThrow();
	// 	expect(() => renderMessage(<Text>hi</Text>)).not.toThrow();
	// 	expect(() =>
	// 		renderMessage(<Timestamp timestamp={new Date()} />)
	// 	).toThrow();
	// 	expect(() => renderMessage(<Title>Title</Title>)).toThrow();
	// 	expect(() =>
	// 		renderMessage(<Url href='https://dvmm.dev'>DVMM</Url>)
	// 	).toThrow();
	// });
});

describe('renders text message', () => {
	it('creates text message', () => {
		expect(() => renderMessage(<Text></Text>)).not.toThrow();

		const mockUpdateFn = jest.fn();

		renderMessage(<Text>qwerty</Text>, null, mockUpdateFn);

		expect(mockUpdateFn).toHaveBeenCalledTimes(1);
		expect(mockUpdateFn).toHaveBeenCalledWith<[Container['content']]>({
			components: [],
			embeds: [],
			text: { content: 'qwerty' },
		});
	});

	it('parses text node', () => {
		expect(parseTextNode(<></>)).toBe('');
		expect(parseTextNode(<>hello</>)).toBe('hello');
		expect(parseTextNode(<Span>hello</Span>)).toBe('hello');
		expect(parseTextNode(<Span bold>hello</Span>)).toBe('**hello**');
		expect(parseTextNode(<Span italic>hello</Span>)).toBe('*hello*');
		expect(
			parseTextNode(
				<Span bold italic>
					hello
				</Span>
			)
		).toBe('***hello***');
		expect(parseTextNode(<Link href='https://dvmm.dev/'>hello</Link>)).toBe(
			'[hello](https://dvmm.dev/)'
		);
	});
});

describe('updates message', () => {
	// it('updates message text', () => {
	// 	const TestMessage = () => {
	// 		const [msg, setMsg] = useState('initial');
	// 		useEffect(() => {
	// 			setMsg('changed');
	// 		}, []);
	// 		return <Text>{msg}</Text>;
	// 	};
	// 	setTimeout(() => {
	// 		expect(callCount).to.equal(1);
	// 		wrapper.setProps({ randomProp: 1 });
	// 		setTimeout(() => {
	// 			expect(callCount).to.equal(2);
	// 			done();
	// 		}, 50);
	// 	}, 50);
	// 	const mockUpdateFn = jest.fn();
	// 	renderMessage(<Text>qwerty</Text>, null, mockUpdateFn);
	// 	expect(mockUpdateFn).toHaveBeenCalledTimes(1);
	// 	expect(mockUpdateFn).toHaveBeenCalledWith<[Container['content']]>({
	// 		components: [],
	// 		embeds: [],
	// 		text: 'qwerty',
	// 	});
	// });
});
