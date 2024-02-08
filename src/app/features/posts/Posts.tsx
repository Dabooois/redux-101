import React from 'react';
import { useSelector } from 'react-redux';
import { postsError, postsLists, postsState } from './postsSelector';

import PostAuthor from './PostAuthor';
import Reaction from './Reaction';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../store';
import { getUserStatus } from '../users/userSelector';
import { fetchUsers } from '../users/usersSlice';
import { Link } from 'react-router-dom';

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
			{posts.map((el) => {
				return (
					<div key={el.id}>
						<h3>{el.title}</h3>
						<p>{el.body}</p>
						<PostAuthor userId={Number(el.userId)} />
						<Reaction post={el} />
						<div>
							<Link to={`post/${el.id}`}>Edit</Link>
						</div>
					</div>
				);
			})}
		</>
	);
};

export default Posts;
