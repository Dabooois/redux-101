import React from 'react';
import {
	useAddPostMutation,
	useDeletePostMutation,
	useGetPostsQuery,
	useUpdatePostMutation,
} from '../../api/apiSlice';
import { nanoid } from '@reduxjs/toolkit';

const Posts2 = () => {
	const { data: posts, isError, isSuccess, refetch } = useGetPostsQuery();
	const [deletePost] = useDeletePostMutation();
	const [updatePost] = useUpdatePostMutation();
	const [addPost] = useAddPostMutation();
	if (isError) {
		return <>Error... Something went wrong!</>;
	}

	const handleDeletePost = (id: string) => {
		deletePost({ postId: id });
		refetch();
	};
	const handleUpdateePost = (id: string) => {
		updatePost({
			id,
			body: 'updated ka boi',
			title: 'test rtk',
			userId: 1,
		});
	};
	const handleAddPost = () => {
		addPost({
			id: nanoid(),
			body: 'add ka boi',
			title: 'test rtk',
			userId: 1,
		});
	};

	return (
		<div>
			{isSuccess &&
				posts.map((post) => {
					return (
						<div key={post?.id}>
							<h6>{post?.title}</h6>
							<p>{post?.body}</p>
							<button onClick={() => handleAddPost()}>Add</button>
							<button onClick={() => handleUpdateePost(post.id)}>
								Update
							</button>
							<button onClick={() => handleDeletePost(post.id)}>
								Delete
							</button>
						</div>
					);
				})}
		</div>
	);
};

export default Posts2;
