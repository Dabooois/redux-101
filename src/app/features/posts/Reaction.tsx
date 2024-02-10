import { TPost } from './postSlice';
import { useDispatch } from 'react-redux';

export type Name = 'coffee' | 'thumbsUp' | 'heart' | 'rocket' | 'wow';
const Reaction = ({ post }: { post: TPost }) => {
	const dispatch = useDispatch();
	const emojis = {
		thumbsUp: '👍',
		heart: '❤️',
		wow: '😮',
		rocket: '🚀',
		coffee: '☕',
	};

	const handleReact = (id: string, reaction: Name) => {
		// dispatch(addReaction({ id: Number(id), reaction }));
	};

	return (
		<>
			hello
			{/* {Object.entries(emojis).map(([name, emoji]) => {
				const newName = name as Name;

				return (
					<button
						key={name}
						onClick={() => handleReact(post.id, newName)}
					>
						{emoji} {post.reactions[newName]}
					</button>
				);
			})} */}
		</>
	);
};

export default Reaction;
