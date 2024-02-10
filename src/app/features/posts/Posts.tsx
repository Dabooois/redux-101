import React from 'react';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../store';

import { postsData } from './postSlice';
import PostExcerpt from './PostExcerpt';

const Posts = () => {
	const dispatch = useDispatch<AppDispatch>();
	const posts = useSelector(postsData);

	// if (status === 'loading') {
	// 	return <>Loading....</>;
	// }

	// if (status === 'failed') {
	// 	return <>Error.... {error}</>;
	// }
	// console.log(posts);
	return (
		<>
			<h2>Posts</h2>
			{/* {posts.map((el) => {
				return <PostExcerpt key={el.id} {...el} />;
			})} */}
		</>
	);
};

export default Posts;
