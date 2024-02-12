import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { getUserById, useGetUserQuery } from '../users/usersSlice';
import { RootState } from '../../store';

function PostAuthor({ userId }: { userId: number }) {
	const { data: user, isLoading, isError } = useGetUserQuery(String(userId));

	if (isLoading) return <>Loading...</>;
	if (isError) return <>Error...</>;

	return (
		<div>
			<p>
				Authored by:
				{user ? (
					<Link to={`users/${user.id}/posts`}>{user.name}</Link>
				) : (
					'Unknon Author'
				)}
			</p>
		</div>
	);
}

export default PostAuthor;
