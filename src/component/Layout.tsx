import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
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
							<Link to='/post'>Cretate new Post</Link>
						</li>
					</ul>
				</nav>
			</header>
			<main className='App'>
				<Outlet />
			</main>
		</>
	);
};

export default Layout;
