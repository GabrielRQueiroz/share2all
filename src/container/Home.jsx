/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { HiMenu } from 'react-icons/hi';
import { Link, Route, Routes } from 'react-router-dom';
import logo from '../assets/logo.png';
import darkLogo from '../assets/logowhite.png';
import { client } from '../client';
import { Sidebar, UserProfile } from '../components';
import { ThemeContext } from '../context/themeContext';
import { userQuery } from '../utils/data';
import { fetchUser } from '../utils/fetchUser';
import Pins from './Pins';

const Home = () => {
	const [toggleSidebar, setToggleSidebar] = useState(false);
	const [user, setUser] = useState(null);
	const { theme } = useContext(ThemeContext);
	const scrollRef = useRef(null);

	const userInfo = fetchUser();

	useEffect(() => {
		const query = userQuery(userInfo?.googleId);

		client.fetch(query).then((data) => {
			setUser(data[0]);
		});
	}, []);

	useEffect(() => {
		scrollRef.current.scrollTo(0, 0);
	}, [Sidebar]);

	return (
		<div className='flex bg-secondary md:flex-row flex-col h-screen ease-out transition-all duration-500'>
			<div className='hidden md:flex h-screen flex-initial'>
				<Sidebar user={user && user} />
			</div>
			<div className='flex md:hidden flex-row'>
				<div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
					<HiMenu
						fontSize={40}
						className='cursor-pointer text-primary duration-75'
						onClick={() => setToggleSidebar(true)}
					/>
					<Link to='/'>
						<img src={theme === 'dark' ? darkLogo : logo} alt='logo' className='w-36' />
					</Link>
					<Link to={`user-profile/${user?._id}`}>
						<img src={user?.image} alt='user-pic' className='w-9 h-9 rounded-full ' />
					</Link>
				</div>
				{toggleSidebar && (
					<div className='fixed w-3/4 sm:w-2/4 bg-primary h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
						<div className='absolute w-full flex justify-end items-center p-2'>
							<AiFillCloseCircle
								fontSize={30}
								className='cursor-pointer text-primary duration-75'
								onClick={() => setToggleSidebar(false)}
							/>
						</div>
						<Sidebar closeToggle={setToggleSidebar} user={user && user} />
					</div>
				)}
			</div>
			<div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
				<Routes>
					<Route path='/user-profile/:userId' element={<UserProfile />} />
					<Route path='/*' element={<Pins user={user && user} />} />
				</Routes>
			</div>
		</div>
	);
};

export default Home;
