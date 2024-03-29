import React from 'react';
import { useSelector } from 'react-redux';
import { getUsers } from '../users/userSelector';

function PostAuthor({ userId }: { userId: number }) {
	const users = useSelector(getUsers);
	const author = users.find((user) => Number(user.id) === userId);

	return (
		<div>
			<p>Authored by: {author?.name || 'Unknon Author'}</p>
		</div>
	);
}

export default PostAuthor;
