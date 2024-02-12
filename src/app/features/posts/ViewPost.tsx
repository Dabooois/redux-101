import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { postById } from './postsSelector';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useDeletePostMutation } from './postSlice';

const ViewPost = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const post = useSelector((state: RootState) => postById(state, Number(id)));
	const handleDeletePost = async (id: string) => await deletePost({ id });
	const [deletePost] = useDeletePostMutation();
	if (!post) {
		return <>Empty....Id is not valid</>;
	}

	return (
		<div key={post?.id}>
			<h6>{post?.title}</h6>
			<p>{post?.body}</p>
			<Link to={`/post/${post.id}/edit`}>Edit</Link>
			<button
				onClick={() => {
					handleDeletePost(post.id);
					navigate('/');
				}}
			>
				Delete
			</button>
		</div>
	);
};

export default ViewPost;
