import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
// import Counter from './app/features/counter/Counter';
import Posts from './app/features/posts/Posts';
import ViewPost from './app/features/posts/ViewPost';
import Layout from './component/Layout';
import PostForm from './app/features/posts/PostForm';
import EditPost from './app/features/posts/EditPost';

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
			</Route>
		</Routes>
	);
}

export default App;
