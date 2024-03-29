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
		dispatch(addReaction({ id: Number(id), reaction }));
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
