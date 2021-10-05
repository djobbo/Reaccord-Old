export { renderMessage } from './Reaccord';

export const Embed = 'Embed';
export const Author = 'Author';
export const Color = 'Color';
export const Desc = 'Desc';
export const Field = 'Field';
export const Footer = 'Footer';
export const Image = 'Image';
export const Timestamp = 'Timestamp';
export const Title = 'Title';
export const Url = 'Url';
export const Row = 'Row';
export const Button = 'Button';
export const LinkButton = 'Button';
export const Select = 'Select';
export const Option = 'Option';
export const Text = 'Text';
export const Br = 'Br';
export const Span = 'Span';
export const Link = 'Link';
export const Code = 'Code';

// type Keyed<Props> = Props & { key?: Key | null };

// type ReaccordNodeComponent<Props> = FC<Keyed<Props>>;

// interface EmbedProps {
// 	children?: ReactNode;
// }
// // export const Embed: ReaccordNodeComponent<EmbedProps> = ({
// // 	key,
// // 	...props
// // }) => ();

// interface AuthorProps {
// 	children?: ReactNode;
// 	iconURL?: string;
// 	url?: string;
// }
// export const Author: ReaccordNodeComponent<AuthorProps> = ({
// 	key,
// 	...props
// }) => ({ type: 'Author', key: key ?? null, props });

// interface ColorProps {
// 	hex: string;
// }
// export const Color: ReaccordNodeComponent<ColorProps> = ({
// 	key,
// 	...props
// }) => ({ type: 'Color', key: key ?? null, props });

// interface DescProps {
// 	children?: ReactNode;
// }
// export const Desc: ReaccordNodeComponent<DescProps> = ({ key, ...props }) => ({
// 	type: 'Desc',
// 	key: key ?? null,
// 	props,
// });

// interface FieldProps {
// 	children?: ReactNode;
// 	title: ReactNode;
// 	inline?: boolean;
// }
// export const Field: ReaccordNodeComponent<FieldProps> = ({
// 	key,
// 	...props
// }) => ({
// 	type: 'Field',
// 	key: key ?? null,
// 	props,
// });

// interface FooterProps {
// 	children?: ReactNode;
// 	iconUrl?: string;
// }
// export const Footer: ReaccordNodeComponent<FooterProps> = ({
// 	key,
// 	...props
// }) => ({
// 	type: 'Footer',
// 	key: key ?? null,
// 	props,
// });

// interface ImageProps {
// 	url: string;
// }
// export const Image: ReaccordNodeComponent<ImageProps> = ({
// 	key,
// 	...props
// }) => ({
// 	type: 'Image',
// 	key: key ?? null,
// 	props,
// });

// interface TimestampProps {
// 	timestamp: number | Date;
// }
// export const Timestamp: ReaccordNodeComponent<TimestampProps> = ({
// 	key,
// 	...props
// }) => ({
// 	type: 'Timestamp',
// 	key: key ?? null,
// 	props,
// });

// interface TitleProps {
// 	children?: ReactNode;
// }
// export const Title: ReaccordNodeComponent<TitleProps> = ({
// 	key,
// 	...props
// }) => ({
// 	type: 'Title',
// 	key: key ?? null,
// 	props,
// });

// // underline / crossed
// interface UrlProps {
// 	href: string;
// }
// export const Url: ReaccordNodeComponent<UrlProps> = ({ key, ...props }) => ({
// 	type: 'Url',
// 	key: key ?? null,
// 	props,
// });

// // Text Nodes
// interface TextProps {
// 	children?: ReactNode;
// }
// export const Text: ReaccordNodeComponent<TextProps> = ({ key, ...props }) => ({
// 	type: 'Text',
// 	key: key ?? null,
// 	props,
// });

// interface BrProps {}
// export const Br: ReaccordNodeComponent<BrProps> = ({ key, ...props }) => ({
// 	type: 'Br',
// 	key: key ?? null,
// 	props,
// });

// interface SpanProps {
// 	children?: ReactNode;
// 	bold?: boolean;
// 	italic?: boolean;
// }
// export const Span: ReaccordNodeComponent<SpanProps> = ({ key, ...props }) => ({
// 	type: 'Span',
// 	key: key ?? null,
// 	props,
// });

// interface LinkProps {
// 	href: string;
// 	children?: ReactNode;
// }
// export const Link: ReaccordNodeComponent<LinkProps> = ({ key, ...props }) => ({
// 	type: 'Link',
// 	key: key ?? null,
// 	props,
// });

// interface CodeProps {
// 	lang: string;
// 	children?: ReactNode;
// }
// export const Code: ReaccordNodeComponent<CodeProps> = ({ key, ...props }) => ({
// 	type: 'Code',
// 	key: key ?? null,
// 	props,
// });

// // Interaction Nodes
// interface RowProps {
// 	children?: ReactNode;
// }
// export const Row: ReaccordNodeComponent<RowProps> = ({ key, ...props }) => ({
// 	type: 'Row',
// 	key: key ?? null,
// 	props,
// });

// interface ButtonPropsBase {
// 	children?: ReactNode;
// 	emoji?: APIMessageComponentEmoji;
// 	disabled?: boolean;
// }

// interface ButtonProps extends ButtonPropsBase {
// 	style?: 'Primary' | 'Secondary' | 'Success' | 'Danger';
// 	customId: string;
// 	onClick?: (message: unknown) => void;
// }
// export const Button: ReaccordNodeComponent<ButtonProps> = ({
// 	key,
// 	...props
// }) => ({
// 	type: 'Button',
// 	key: key ?? null,
// 	props: {
// 		...props,
// 		style: props.style ?? 'Primary',
// 	},
// });

// interface LinkButtonProps extends ButtonPropsBase {
// 	url: string;
// }
// export const LinkButton: ReaccordNodeComponent<LinkButtonProps> = ({
// 	key,
// 	...props
// }) => ({
// 	type: 'Button',
// 	key: key ?? null,
// 	props: {
// 		...props,
// 		style: 'Link',
// 	},
// });

// interface SelectProps {
// 	children?: ReactNode;
// 	customId: string;
// 	placeholder: ReactNode;
// 	minValues?: number;
// 	maxValues?: number;
// 	disabled?: boolean;
// }
// interface OptionProps {
// 	children?: ReactNode;
// 	value: string;
// 	description?: string;
// 	emoji?: APIMessageComponentEmoji;
// 	default?: boolean;
// }
// export const Option: ReaccordNodeComponent<OptionProps> = ({
// 	key,
// 	...props
// }) => ({
// 	type: 'Option',
// 	key: key ?? null,
// 	props,
// });
