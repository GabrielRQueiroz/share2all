import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import { AiOutlineLogout } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { confirmAlert } from 'react-confirm-alert';
import GoogleLogoutPopup from './GoogleLogoutPopup';
import { GoogleLogout } from 'react-google-login';
import { ThemeContext } from '../context/themeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
	const [visibleMenu, setVisibleMenu] = useState(false);
	const { theme, setTheme } = useContext(ThemeContext);
	const navigate = useNavigate();

	if (!user) return null;

	const toggleTheme = () => {
		theme === 'dark' ? setTheme('light') : setTheme('dark');
	};

	const logout = () => {
		localStorage.clear();

		navigate('/login');
	};

	const submit = () => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return <GoogleLogoutPopup logout={logout} onClose={onClose} />;
			},
		});
	};

	return (
		<div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
			<button
				className='p-3 bg-primary self-center shadow-md text-xl rounded-full h-max w-max'
				onClick={toggleTheme}
			>
				{theme === 'dark' ? <FaSun color='white' /> : <FaMoon color='black' />}
			</button>
			<div className='flex text-primary justify-start items-center grow px-2 relative group rounded-md bg-primary border-none outline-none focus-within:shadow-sm'>
				<IoMdSearch fontSize={21} className='ml-1 duration-75' />
				<input
					type='text'
					id='search'
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder='Search'
					value={searchTerm}
					onFocus={() => navigate('/search')}
					autoComplete='off'
					className='p-2 h-full bg-primary w-full peer outline-none'
				/>
				{/* <label
					for='search'
					className='transform transition-all absolute top-0 left-0 h-full flex items-center pl-12 text-md group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/4 peer-valid:h-1/4 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0'
				>
				Search
				</label> */}
			</div>
			<div className='flex gap-3 w-max'>
				<div className='hidden md:block'>
					<div
						className='shadow-sm hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500'
						onClick={() => setVisibleMenu(!visibleMenu)}
					>
						<img
							src={user.image}
							alt='user-pic'
							className='aspect-square h-12 w-12 object-cover rounded-lg'
						/>
					</div>
					{visibleMenu && (
						<div
							className='mt-1 absolute -translate-x-20 w-48 rounded-md shadow-lg bg-primary ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 z-50 focus:outline-none'
							role='menu'
							aria-orientation='vertical'
							aria-labelledby='menu-button'
							tabIndex='-1'
						>
							<div className='py-1' role='none'>
								<Link
									to={`user-profile/${user?._id}`}
									className='text-primary px-4 py-2 text-sm hover:bg-secondary flex items-center'
									role='menuitem'
									tabIndex='-1'
									id='menu-item-0'
								>
									<BsFillPersonFill className='mr-2 duration-75' fontSize={21} />{' '}
									<strong>Profile</strong>
								</Link>
							</div>
							<div className='py-1' role='none' onClick={submit}>
								<GoogleLogout
									clientId={`${process.env.REACT_APP_GOOGLE_TOKEN_API}`}
									render={(renderProps) => (
										<button
											type='button'
											className='text-accent w-full px-4 py-2 text-sm hover:bg-secondary flex items-center'
											role='menuitem'
											tabIndex='-1'
											id='menu-item-1'
											disabled={renderProps.disabled}
										>
											<AiOutlineLogout className='mr-2 duration-75' fontSize={21} />{' '}
											<strong>Log out</strong>
										</button>
									)}
									onLogoutSuccess={logout}
									cookiePolicy='single_host_origin'
								/>
							</div>
						</div>
					)}
				</div>
				<Link
					to='/create-pin'
					className='bg-black dark:bg-white self-center text-primary rounded-md aspect-square w-12 h-12 flex justify-center items-center'
				>
					<IoMdAdd size={20} className='text-white dark:text-black font-bold duration-75' />
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
