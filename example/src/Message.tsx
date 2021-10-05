import { useEffect, useState } from 'react';
import {
	Embed,
	Title,
	Span,
	Text,
	Row,
	Color,
	Button,
	LinkButton,
	Field,
} from 'reaccord';
import axios from 'axios';

interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export const Message = () => {
	const [xd, setXd] = useState('hello');
	const [posts, setPosts] = useState<Post[]>([]);

	const fetchData = async () => {
		const data = await axios
			.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
			.then((res) => res.data);
		setPosts(data.slice(0, 2));
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			setXd('nice');
		}, 1000);

		return () => {
			clearTimeout(timeout);
		};
	}, []);

	return (
		<>
			<Embed>
				<Title>
					Hello<Span>{xd}</Span>
					{5}
				</Title>
				<Color hex='#123456' />
			</Embed>
			<Text>
				BLA BLA<Span>{xd}</Span>
			</Text>
			<Embed>
				<Title>
					Hello<Span>xd</Span>
					{xd}
				</Title>
				{posts.map((post) => (
					<Field title={post.title} key={post.id}>
						{post.body}
					</Field>
				))}
			</Embed>
			<Text>Nn c tro</Text>
			<Row>
				<Button
					emoji={{ name: '😃' }}
					onClick={() => {
						setXd('bruh');
						fetchData();
					}}
					style='Secondary'
					customId='mybutton'
					disabled={posts.length > 0}
				>
					{posts.length <= 0 ? `Hello${xd}` : 'Posts Fetched!'}
				</Button>
				<LinkButton url='https://dvmm.dev'>Link</LinkButton>
			</Row>
		</>
	);
};
