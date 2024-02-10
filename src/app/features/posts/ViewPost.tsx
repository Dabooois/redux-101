import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { postById } from './postsSelector';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { deletePost } from './postSlice';

const ViewPost = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const post = useSelector((state: RootState) => postById(state, Number(id)));
	const dispatch = useDispatch<AppDispatch>();

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
					// dispatch(deletePost(`${post.id}`));
					navigate('/');
				}}
			>
				Delete
			</button>
		</div>
	);
};

export default ViewPost;
