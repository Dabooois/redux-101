import React from 'react';
import { useSelector } from 'react-redux';
import { getUserStatus, getUsers } from './userSelector';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { fetchUsers } from './usersSlice';

const UsersPage = () => {
	const dispatch = useDispatch<AppDispatch>();
	const userStatus = useSelector(getUserStatus);
	const users = useSelector(getUsers);
	React.useEffect(() => {
		if (userStatus === 'idle') {
			dispatch(fetchUsers());
		}
	}, [dispatch, userStatus]);
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
