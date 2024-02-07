import React from 'react';
import { useSelector } from 'react-redux';
import { getUsers } from '../users/userSelector';

function PostAuthor({ userId }: { userId: string }) {
	const users = useSelector(getUsers);
	const author = users.find((user) => user.id === userId);
	return (
		<div>
			<p>{author?.name || 'Unknon Author'}</p>
		</div>
	);
}

export default PostAuthor;
