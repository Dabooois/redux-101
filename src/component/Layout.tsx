import { useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

import { AppDispatch } from '../app/store';

const Layout = () => {
	const dispatch = useDispatch<AppDispatch>();

	return (
		<>
			<header>
				<div>
					<h1>Basic Blog</h1>
				</div>
				<nav>
					<ul>
						<li>
							<Link to=''>Home</Link>
						</li>
						<li>
							<Link to='/users'>Users</Link>
						</li>
						<li>
							<Link to='/post'>Cretate new Post</Link>
						</li>
					</ul>
				</nav>
				{/* <button onClick={handleCount}>Count {count}</button> */}
			</header>
			<main className='App'>
				<Outlet />
			</main>
		</>
	);
};

export default Layout;
