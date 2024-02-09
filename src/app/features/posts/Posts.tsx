import React from 'react';
import { useSelector } from 'react-redux';
import { postsError, postsLists, postsState } from './postsSelector';

import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../store';
import { getUserStatus } from '../users/userSelector';
import { fetchUsers } from '../users/usersSlice';

import PostExcerpt from './PostExcerpt';

const Posts = () => {
	const dispatch = useDispatch<AppDispatch>();
	const posts = useSelector(postsLists);
	const status = useSelector(postsState);
	const error = useSelector(postsError);

	const userStatus = useSelector(getUserStatus);

	React.useEffect(() => {
		if (userStatus === 'idle') {
			dispatch(fetchUsers());
		}
	}, [userStatus, dispatch]);

	if (status === 'loading') {
		return <>Loading....</>;
	}

	if (status === 'failed') {
		return <>Error.... {error}</>;
	}

	return (
		<>
			<h2>Posts</h2>
			{Object.values(posts).map((el) => {
				return <PostExcerpt key={el.id} {...el} />;
			})}
		</>
	);
};

export default Posts;
