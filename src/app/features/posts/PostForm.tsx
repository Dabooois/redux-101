import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { newPost } from './postSlice';
import { useSelector } from 'react-redux';
import { getUsers } from '../users/userSelector';
import { AppDispatch } from '../../store';

const INITIAL_STATE = {
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
	const [postForm, setPostForm] = useState(INITIAL_STATE);
	const { title, body, userId } = postForm;
	const dispatch = useDispatch<AppDispatch>();
	const users = useSelector(getUsers);

	const handleOnChage = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;

		setPostForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			dispatch(newPost({ title, body, userId: Number(userId) })).unwrap();

			setPostForm(INITIAL_STATE);
		} catch (error) {
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

export default PostForm;
