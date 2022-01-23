import React, { useContext } from 'react';
import { ImHome } from 'react-icons/im';
import { IoIosArrowForward } from 'react-icons/io';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import darkLogo from '../assets/logowhite.png';
import { ThemeContext } from '../context/themeContext';
import { categories } from '../utils/data';

const isNotActiveStyle =
	'flex items-center px-5 gap-3 text-secondary hover:text-primary transition-all duration-200 ease-in-out capitalize';
const isActiveStyle =
	'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black dark:border-white transition-all duration-200 ease-in-out capitalize';

const Sidebar = ({ closeToggle, user }) => {
	const { theme } = useContext(ThemeContext);

	const handleCloseSidebar = () => {
		if (closeToggle) closeToggle(false);
	};

	return (
		<div className='flex flex-col justify-between bg-primary h-full overflow-y-scroll min-w-210 w-auto hide-scrollbar'>
			<div className='flex flex-col'>
				<div className='flex px-4 mt-6 mb-8 w-full justify-between max-w-[16rem] items-center'>
					<Link to='/' onClick={handleCloseSidebar}>
						<img
							src={theme === 'dark' ? darkLogo : logo}
							alt='logo'
							className='w-full pr-8 object-center'
						/>
					</Link>
				</div>
				<div className='flex flex-col gap-5 text-primary'>
					<NavLink
						to='/'
						className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
						onClick={handleCloseSidebar}
					>
						<ImHome className='duration-75' size='1.5rem' />
						Home
					</NavLink>
					<h3 className='mt-2 px-5 text-base 2xl:text-xl'>Discover categories</h3>
					{categories.slice(0, categories.length - 1).map((category) => (
						<NavLink
							to={`/category/${category.name}`}
							className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
							onClick={handleCloseSidebar}
							key={category.name}
						>
							<img
								src={category.image}
								alt='Category Preview'
								className='w-9 h-9 object-cover rounded-full shadow-sm'
							/>
							{category.name}
						</NavLink>
					))}
				</div>
			</div>
			{user && (
				<Link
					to={`user-profile/${user._id}`}
					className='flex text-primary my-5 mb-3 gap-2 p-2 items-center bg-primary rounded-lg shadow-lg mx-3 hover:bg-gray-100 dark:hover:bg-slate-700'
					onClick={handleCloseSidebar}
				>
					<img src={user.image} className='w-10 h-10 rounded-full' alt='user-profile' />
					<p className='ml-2'>{user.userName}</p>
					<IoIosArrowForward className='duration-75' />
				</Link>
			)}
		</div>
	);
};

export default Sidebar;
