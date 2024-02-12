import { Link } from 'react-router-dom';

import { getUsers, useGetUsersQuery } from './usersSlice';
import { useSelector } from 'react-redux';
const UsersPage = () => {
	const { isLoading, isError } = useGetUsersQuery();
	const users = useSelector(getUsers);

	if (isLoading) return <>Loading...</>;
	if (isError) return <>Error...</>;

	return (
		<div>
			{users.map((el) => {
				return (
					<div key={el.id}>
						<h3>{el.name}</h3>
						<Link to={`/users/${el.id}/posts`}>View Post</Link>
					</div>
				);
			})}
		</div>
	);
};

export default UsersPage;
