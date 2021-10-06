import { Client } from 'discord.js';
import { ReactNode } from 'react';
import ReactReconciler, { HostConfig } from 'react-reconciler';

export const parseTextNode = (el): string => {
	if (typeof el === 'undefined' || el === null) return '';

	if (Array.isArray(el)) return parseTextNodeGroup(el);

	if (typeof el !== 'object') return el.toString();

	switch (el.type) {
		case 'Span':
			const decoration =
				(el.props.bold ? '**' : '') + (el.props.italic ? '*' : '');
			return decoration + parseTextNode(el.props.children) + decoration;
		case 'Link':
			return `[${parseTextNode(el.props.children)}](${parseTextNode(
				el.props.href
			)})`;
		default:
			return parseTextNode(el.props?.children ?? '');
	}
};

interface MessageContent {
	embeds: unknown[];
	components: unknown[];
	text: { content: string };
}

type NotifyFunction = (message: MessageContent) => Promise<void>;

export interface Container {
	client?: Client | null;
	notify?: NotifyFunction;
	content: MessageContent;
}

const parseTextNodeGroup = (els): string =>
	els.reduce((text, el) => text + parseTextNode(el), '');

const buttonStyles = {
	Primary: 1,
	Secondary: 2,
	Success: 3,
	Danger: 4,
	Link: 5,
};

const getButtonStyle = (style: keyof typeof buttonStyles) =>
	buttonStyles[style];

// TODO: Fix type
const hostConfig: Partial<
	HostConfig<
		any, // JSX.InstrinsicElements
		any,
		Container,
		any,
		any,
		null,
		null,
		null,
		{},
		[string, string][],
		null,
		null,
		null
	>
> = {
	supportsMutation: true,
	getRootHostContext: () => null,
	getChildHostContext: (parentHostContext) => parentHostContext,

	prepareForCommit: () => null,
	resetAfterCommit: (container) => {
		if (!container.notify) return;
		container?.notify(container.content);
	},
	shouldSetTextContent: (type) =>
		['Text', 'Title', 'Field', 'Button', 'LinkButton'].includes(type),
	createInstance: (type, props, rootContainer) => {
		switch (type) {
			case 'Text':
				return {
					type,
					text: { content: parseTextNode(props.children) },
				};
			case 'Embed':
				return {
					type,
					embed: {},
				};
			case 'Row':
				return {
					type,
					components: [],
				};
			case 'Button':
				if (props.onClick) {
					rootContainer.client?.on(
						'interactionCreate',
						(interaction) => {
							if (!interaction.isButton()) return;
							if (interaction.customId !== props.customId) return;
							props.onClick?.(interaction);
							interaction.deferUpdate();
						}
					);
				}
				return {
					type,
					...props,
				};
			default:
				return {
					type,
					...props,
				};
		}
	},
	createTextInstance: () => {
		throw new Error('Invalid Text Node');
	},
	clearContainer: (container) => {
		container = {
			client: container.client,
			notify: container.notify,
			content: { embeds: [], components: [], text: { content: '' } },
		};
	},
	finalizeInitialChildren: () => false, // if true -> commitMount method
	appendInitialChild: (parentInstance, child) => {
		//  TODO: throw if embed/text/row
		//  Because they should always be at the top level.
		switch (child.type) {
			case 'Title':
				parentInstance.embed.title = parseTextNode(child.children);
				break;

			case 'Field':
				if (!parentInstance.embed.fields)
					parentInstance.embed.fields = [];
				parentInstance.embed.fields.push({
					name: child.title,
					value: parseTextNode(child.children),
				});
				break;

			case 'Button':
				parentInstance.components.push({
					type: 'BUTTON',
					emoji: child.emoji,
					label: parseTextNode(child.children),
					disabled: child.disabled ?? false,
					custom_id: child.customId,
					options: child.options ?? [],
					style: getButtonStyle(child.style ?? 'Primary'),
				});
				break;

			case 'LinkButton':
				parentInstance.components.push({
					type: 'BUTTON',
					emoji: child.emoji,
					label: parseTextNode(child.children),
					url: child.href,
					disabled: child.disabled ?? false,
					options: child.options ?? [],
					style: getButtonStyle('Link'),
				});
				break;

			default:
				break;
		}
	},
	appendChild: (parentInstance, child) => {
		switch (child.type) {
			case 'Title':
				parentInstance.embed.title = parseTextNode(child.children);
				break;

			case 'Field':
				if (!parentInstance.embed.fields)
					parentInstance.embed.fields = [];
				parentInstance.embed.fields.push({
					name: child.title,
					value: parseTextNode(child.children),
				});
				break;

			case 'Button':
				parentInstance.components.push({
					type: 'BUTTON',
					emoji: child.emoji,
					label: parseTextNode(child.children),
					disabled: child.disabled ?? false,
					custom_id: child.customId,
					options: child.options ?? [],
					style: getButtonStyle(child.style ?? 'Primary'),
				});
				break;

			case 'LinkButton':
				parentInstance.components.push({
					type: 'BUTTON',
					emoji: child.emoji,
					label: parseTextNode(child.children),
					url: child.href,
					disabled: child.disabled ?? false,
					options: child.options ?? [],
					style: getButtonStyle('Link'),
				});
				break;

			default:
				break;
		}
	},
	appendChildToContainer: (container, child) => {
		//  TODO: throw if not embed/text/row
		//  Because only those should be at the top level.
		switch (child.type) {
			case 'Text':
				container.content.text = child.text;
				break;

			case 'Embed':
				container.content.embeds.push(child.embed);
				break;

			case 'Row':
				container.content.components.push(child.components);
				break;

			default:
				throw new Error('Bad Node');
		}
	},
	removeChildFromContainer: (container, child) => {
		switch (child.type) {
			case 'Text':
				container.content.text.content = ''; // TODO: might not work
				break;
			case 'Embed':
				container.content.embeds?.filter(
					(item) => item !== child.embed
				);
				break;

			case 'Row':
				container.content.components?.filter(
					(item) => item !== child.components
				);
				break;

			default:
				throw new Error('Bad Node');
		}
	},
	prepareUpdate: (
		instance,
		type,
		oldProps,
		newProps,
		rootContainer,
		hostContext
	) => {
		switch (type) {
			case 'Embed':
				// TODO: Update Embed
				if (!newProps.children) return;

				return (
					Array.isArray(newProps.children)
						? newProps.children
						: [newProps.children]
				)
					?.map((child) => {
						switch (child.type) {
							case 'Title':
								return [
									'title',
									parseTextNode(child.props.children),
								];
							default:
								return null;
						}
					})
					.filter(Boolean);

			case 'Text':
				return [['text', parseTextNode(newProps.children)]];

			case 'Row':
				// TODO: Update Components
				return;

			default:
				return;
		}
	},
	commitUpdate: (
		instance,
		updatePayload,
		type,
		prevProps,
		nextProps,
		internalHandle
	) => {
		switch (type) {
			case 'Embed':
				updatePayload.forEach(([prop, value]) => {
					instance.embed[prop] = value;
				});
				break;

			case 'Text':
				instance.text.content = updatePayload[0][1];
				break;

			default:
				break;
		}
	},
};

const reconciler = ReactReconciler(hostConfig as any); // TODO: Fix type

export const renderMessage = (
	embedElement: ReactNode,
	client?: Client | null,
	onUpdate?: NotifyFunction
) => {
	let container: Container = {
		client,
		notify: onUpdate,
		content: { embeds: [], components: [], text: { content: '' } },
	};
	let reactContainer = reconciler.createContainer(container, 0, false, null);
	reconciler.updateContainer(embedElement, reactContainer, null, null);
};
