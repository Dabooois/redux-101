import { TPost, useAddReactionMutation } from './postSlice';

export type Name = 'coffee' | 'thumbsUp' | 'heart' | 'rocket' | 'wow';
const Reaction = ({ post }: { post: TPost }) => {
	const [addReaction] = useAddReactionMutation();
	const emojis = {
		thumbsUp: '👍',
		heart: '❤️',
		wow: '😮',
		rocket: '🚀',
		coffee: '☕',
	};

	const handleReact = async (id: string, reaction: Name) => {
		const result = {
			reactions: {
				...post.reactions,
				[reaction]: post.reactions[reaction] + 1,
			},
		};
		await addReaction({ postId: id, ...result });
	};

	return (
		<>
			{Object.entries(emojis).map(([name, emoji]) => {
				const newName = name as Name;

				return (
					<button
						key={name}
						onClick={() => handleReact(post.id, newName)}
					>
						{emoji} {post.reactions[newName]}
					</button>
				);
			})}
		</>
	);
};

export default Reaction;
