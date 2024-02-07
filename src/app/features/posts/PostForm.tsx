import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from './postSlice';
import { useSelector } from 'react-redux';
import { getUsers } from '../users/userSelector';

const INITIAL_STATE = {
	title: '',
	content: '',
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
	const { title, content, userId } = postForm;
	const dispatch = useDispatch();
	const users = useSelector(getUsers);

	const handleOnChage = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;

		setPostForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(addPost({ ...postForm }));
		setPostForm(INITIAL_STATE);
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
				<label htmlFor='content'>Content</label>
				<input
					type='text'
					onChange={handleOnChage}
					value={content}
					name='content'
				/>
			</div>

			<div>
				<label htmlFor='content'>Author</label>
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
