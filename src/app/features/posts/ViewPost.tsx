import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { postById } from './postsSelector';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useDeletePostMutation } from './postSlice';
// import { deletePost } from './postSlice';

const ViewPost = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const post = useSelector((state: RootState) => postById(state, Number(id)));
	const [deletePost] = useDeletePostMutation();
	if (!post) {
		return <>Empty....Id is not valid</>;
	}
	const handleDeletePost = async (id: string) => await deletePost({ id });
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
