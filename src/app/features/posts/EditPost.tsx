import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { useNavigate, useParams } from 'react-router-dom';

import { getUsers, useGetUsersQuery } from '../users/usersSlice';
import { useEditPostMutation, useGetPostQuery } from './postSlice';

import { INITIAL_STATE } from './PostForm';

const EditPost = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [updatePost, { isSuccess }] = useEditPostMutation();

	const {
		data: toEditPost,
		isLoading,
		isError,
		isFetching,
	} = useGetPostQuery({
		id: String(id),
	});

	const { isLoading: isLoadingUsers, isError: isErrorUsers } =
		useGetUsersQuery();
	const users = useSelector(getUsers);

	const [postForm, setPostForm] = useState<{
		title: string;
		body: string;
		userId: number;
	}>({
		title: '',
		body: '',
		userId: 0,
	});

	React.useEffect(() => {
		setPostForm({
			title: toEditPost?.title || '',
			body: toEditPost?.body || '',
			userId: Number(toEditPost?.userId) || 0,
		});
	}, [isLoading, toEditPost]);

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
			await updatePost({
				body,
				title,
				userId,
				id: String(toEditPost?.id || ''),
				reactions: toEditPost?.reactions || INITIAL_STATE.reactions,
			}).unwrap();
			navigate('/');
		} catch (error) {
			console.log(error);
			throw new Error(`Error in creating new post`);
		}
	};

	if (isLoading) return <>Loading....</>;
	if (isError) return <>Errrooooor....</>;

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
					{!isLoadingUsers &&
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

export default EditPost;
