import { Link } from 'react-router-dom';
import { useGetUserQuery } from '../users/usersSlice';

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
