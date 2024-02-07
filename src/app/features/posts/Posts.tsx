import React from 'react';
import { useSelector } from 'react-redux';
import { postsError, postsLists, postsState } from './postsSelector';
import PostForm from './PostForm';
import PostAuthor from './PostAuthor';
import Reaction from './Reaction';
import { useDispatch } from 'react-redux';
import { fetchPosts } from './postSlice';
import { AppDispatch } from '../../store';
import { getUserStatus } from '../users/userSelector';
import { fetchUsers } from '../users/usersSlice';

const Posts = () => {
	const dispatch = useDispatch<AppDispatch>();
	const posts = useSelector(postsLists);
	const status = useSelector(postsState);
	const error = useSelector(postsError);

	const userStatus = useSelector(getUserStatus);
	console.log(userStatus);
	React.useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchPosts());
		}
	}, [status, dispatch]);

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

	// const post = useSelector((state: RootState) => postById(state, '2'));

	return (
		<div>
			<PostForm />
			<h1>Posts</h1>
			{posts.map((el) => {
				console.log(el.userId);
				return (
					<div key={el.id}>
						<h6>{el.title}</h6>
						<p>{el.content}</p>
						<PostAuthor userId={Number(el.userId)} />
						<Reaction post={el} />
						<button>Edit</button>
					</div>
				);
			})}
		</div>
	);
};

export default Posts;
