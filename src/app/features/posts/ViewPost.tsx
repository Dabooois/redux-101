import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { postById, postsState } from './postsSelector';
import { useParams } from 'react-router-dom';

const ViewPost = () => {
	const status = useSelector(postsState);
	const { id } = useParams();
	const post = useSelector((state: RootState) => postById(state, Number(id)));

	if (status === 'loading') {
		return <>Loading....</>;
	}

	if (!post) {
		return <>Empty. tang ina ka!</>;
	}

	return (
		<div key={post?.id}>
			<h6>{post?.title}</h6>
			<p>{post?.body}</p>
		</div>
	);
};

export default ViewPost;
