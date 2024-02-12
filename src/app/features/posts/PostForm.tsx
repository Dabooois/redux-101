import React, { useState } from 'react';
import { useGetUsersQuery } from '../users/usersSlice';
import { useAddPostMutation } from './postSlice';
import { nanoid } from '@reduxjs/toolkit';

export const INITIAL_STATE = {
	title: '',
	body: '',
	userId: '',
	reactions: {
		thumbsUp: 0,
		heart: 0,
		wow: 0,
		rocket: 0,
		coffee: 0,
	},
};
const PostForm = () => {
	const [addPost, { isLoading, isError }] = useAddPostMutation();
	const {
		data,
		isLoading: usersLoading,
		isError: usersError,
	} = useGetUsersQuery();

	const users = data && Object.values(data.entities);

	const [postForm, setPostForm] = useState(INITIAL_STATE);
	const { title, body, userId } = postForm;

	const handleOnChage = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;

		setPostForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await addPost({
				body,
				title,
				id: nanoid(),
				userId: Number(userId),
				reactions: INITIAL_STATE.reactions,
			}).unwrap();

			setPostForm(INITIAL_STATE);
		} catch (error) {
			throw new Error(`Error in creating new post`);
		}
	};

	if (isLoading || usersLoading) return <>Loading....</>;
	if (isError || usersError) return <>Errrooooor....</>;

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor='title'>Title</label>
				<input
					type='text'
					value={title}
					onChange={handleOnChage}
					name='title'
				/>
			</div>
			<div>
				<label htmlFor='body'>Content</label>
				<input
					type='text'
					onChange={handleOnChage}
					value={body}
					name='body'
				/>
			</div>

			<div>
				<label htmlFor='userId'>Author</label>
				<select onChange={handleOnChage} value={userId} name='userId'>
					<option value=''>Select User</option>
					{users &&
						users.length > 0 &&
						users.map((el) => {
							return (
								<option value={el.id} key={`users-${el.id}`}>
									{el.name}
								</option>
							);
						})}
				</select>
			</div>

			<button type='submit'>Submit</button>
		</form>
	);
};

export default PostForm;
