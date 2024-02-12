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
			{!isLoading &&
				data?.ids.map((id: string) => {
					const post = data.entities[id] as TPost;
					console.log(post);
					return (
						<div key={post.id}>
							<h3>{post.title}</h3>
							<p>{post.body}</p>
							<Reaction post={post} />
						</div>
					);
				})}
		</>
	);
};

export default UserPage;
