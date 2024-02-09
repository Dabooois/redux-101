import React from 'react';
import { useSelector } from 'react-redux';
import { getUsers } from '../users/userSelector';
import { Link } from 'react-router-dom';

function PostAuthor({ userId }: { userId: number }) {
	const users = useSelector(getUsers);
	const author = users.find((user) => Number(user.id) === userId);

	return (
		<div>
			<p>
				Authored by:{' '}
				{author?.name ? (
					<Link to={`users/${author.id}/posts`}>{author.name}</Link>
				) : (
					'Unknon Author'
				)}
			</p>
		</div>
	);
}

export default PostAuthor;
