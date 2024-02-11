import { useSelector } from 'react-redux';

import { selectAll, useGetPostsQuery } from './postSlice';
import PostExcerpt from './PostExcerpt';

const Posts = () => {
	const { isLoading, isError, isSuccess } = useGetPostsQuery();
	const posts = useSelector(selectAll);

	if (isLoading) return <>Loading...</>;
	if (isError) return <>Error...</>;

	return (
		<>
			<h2>Posts</h2>
			{!isLoading &&
				posts.map((post) => <PostExcerpt key={post.id} {...post} />)}
		</>
	);
};

export default Posts;
