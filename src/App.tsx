import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
// import Counter from './app/features/counter/Counter';
import Posts from './app/features/posts/Posts';
import ViewPost from './app/features/posts/ViewPost';
import Layout from './component/Layout';
import PostForm from './app/features/posts/PostForm';
import EditPost from './app/features/posts/EditPost';
import UserPage from './app/features/users/UserPage';
import UsersPage from './app/features/users/UsersPage';
import Error404Page from './component/404Page';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Posts />} />
				<Route path='post'>
					<Route index element={<PostForm />} />
					<Route path=':id' element={<ViewPost />} />
					<Route path=':id/edit' element={<EditPost />} />
				</Route>
				<Route path='users'>
					<Route index element={<UsersPage />} />
					<Route path=':userId/posts' element={<UserPage />} />
				</Route>

				<Route path='*' element={<Error404Page />} />
			</Route>
		</Routes>
	);
}

export default App;
