import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postByUser } from '../posts/postsSelector';
import { RootState } from '../../store';
import Reaction from '../posts/Reaction';

const UserPage = () => {
	const { userId } = useParams();
	const userPosts = useSelector((state: RootState) =>
		postByUser(state, Number(userId))
	);
	console.log(userPosts);
	return (
		<>
			{userPosts.map((el) => {
				return (
					<div key={el.id}>
						<h3>{el.title}</h3>
						<p>{el.body}</p>
						<Reaction post={el} />
					</div>
				);
			})}
		</>
	);
};

export default UserPage;
