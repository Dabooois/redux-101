import React from 'react';
import { TPost, addReaction } from './postSlice';
import { useDispatch } from 'react-redux';

export type Name = 'coffee' | 'thumbsUp' | 'heart' | 'rocket' | 'wow';
const Reaction = ({ post }: { post: TPost }) => {
	const emojis = {
		thumbsUp: '👍',
		heart: '❤️',
		wow: '😮',
		rocket: '🚀',
		coffee: '☕',
	};
	const dispatch = useDispatch();
	const handleReact = (id: string, reaction: Name) => {
		console.log({ id, reaction });
		dispatch(addReaction({ id, reaction }));
	};

	const reactButtons = Object.entries(emojis).map(([name, emoji]) => {
		const newName = name as Name;

		return (
			<button key={name} onClick={() => handleReact(post.id, newName)}>
				{emoji} {post.reactions[newName]}
			</button>
		);
	});

	return <div>{reactButtons}</div>;
};

export default Reaction;
