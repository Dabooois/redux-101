import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getUserStatus, getUsers } from '../users/userSelector';
import { AppDispatch, RootState } from '../../store';
import { useParams } from 'react-router-dom';
import { editPost } from './postSlice';
import { postById } from './postsSelector';
import { fetchUsers } from '../users/usersSlice';

const EditPost = () => {
	const { id } = useParams();
	const dispatch = useDispatch<AppDispatch>();
	const toEditPost = useSelector((state: RootState) =>
		postById(state, Number(id))
	);
	const users = useSelector(getUsers);
	const usersStatus = useSelector(getUserStatus);
	const [postForm, setPostForm] = useState({
		title: toEditPost?.title,
		body: toEditPost?.body,
		userId: toEditPost?.userId,
	});

	const { title, body, userId } = postForm;

	React.useEffect(() => {
		if (usersStatus === 'idle') {
			dispatch(fetchUsers());
		}
	}, [dispatch, usersStatus]);

	const handleOnChage = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;

		setPostForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			dispatch(
				editPost({
					title: title || '',
					body: body || '',
					userId: Number(userId),
					id: String(id),
				})
			).unwrap();

			setPostForm({
				title: '',
				body: '',
				userId: 0,
			});
		} catch (error) {
			console.log(error);
			throw new Error(`Error in creating new post`);
		}
	};

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
					{users.map((el) => {
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
