import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postByUser } from '../posts/postsSelector';
import { RootState } from '../../store';
import Reaction from '../posts/Reaction';
import { TPost, selectAll, usePostByUserQuery } from '../posts/postSlice';

const UserPage = () => {
	const { userId } = useParams();
	const { data, isLoading, isError, error } = usePostByUserQuery({
		userId: String(userId),
	});

	if (isLoading) return <>Loading...</>;
	if (isError) return <>Error... {error}</>;

	return (
		<>
			{data &&
				data
					.filter((post) => Number(post.userId) === Number(userId))
					.map((el) => {
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
