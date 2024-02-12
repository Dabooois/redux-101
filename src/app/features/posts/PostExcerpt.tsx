import { TPost } from './postSlice';
import PostAuthor from './PostAuthor';
import Reaction from './Reaction';
import { Link } from 'react-router-dom';

const PostExcerpt = (post: TPost) => {
	return (
		<div key={post.id}>
			<h3>{post.title}</h3>
			<p>{post.body}</p>
			<PostAuthor userId={Number(post.userId)} />
			<Reaction post={post} />
			<div>
				<Link to={`post/${post.id}`}>View</Link>
			</div>
		</div>
	);
};

export default PostExcerpt;
