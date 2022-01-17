import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import { AiOutlineLogout } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { confirmAlert } from 'react-confirm-alert';
import GoogleLogoutPopup from './GoogleLogoutPopup';
import { GoogleLogout } from 'react-google-login';

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
	const [visibleMenu, setVisibleMenu] = useState(false);
	const navigate = useNavigate();

	if (!user) return null;

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
		<div className='flex  gap-2 md:gap-5 w-full mt-5 pb-7 '>
			<div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
				<IoMdSearch fontSize={21} className='ml-1' />
				<input
					type='text'
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder='Search'
					value={searchTerm}
					onFocus={() => navigate('/search')}
					className='p-2 w-full bg-white outline-none'
				/>
			</div>
			{/* TODO add dropdown menu instead of direct link to profile page */}
			<div className='flex gap-3 '>
				<div className='hidden md:block'>
					<div
						className='shadow-sm hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500'
						onClick={() => setVisibleMenu(!visibleMenu)}
					>
						<img
							src={user.image}
							alt='user-pic'
							className='aspect-square max-h-16 object-cover rounded-lg'
						/>
					</div>
					{visibleMenu && (
						<div
							className='mt-1 absolute -translate-x-20 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 z-50 focus:outline-none'
							role='menu'
							aria-orientation='vertical'
							aria-labelledby='menu-button'
							tabIndex='-1'
						>
							<div className='py-1' role='none'>
								<Link
									to={`user-profile/${user?._id}`}
									className='text-gray-700 px-4 py-2 text-sm hover:bg-gray-100 flex items-center'
									role='menuitem'
									tabIndex='-1'
									id='menu-item-0'
								>
									<BsFillPersonFill className='mr-2' fontSize={21} />{' '}
									<strong>Profile</strong>
								</Link>
							</div>
							<div className='py-1' role='none' onClick={submit}>
								<GoogleLogout
									clientId={`${process.env.REACT_APP_GOOGLE_TOKEN_API}`}
									render={(renderProps) => (
										<button
											type='button'
											className='text-red-700 w-full px-4 py-2 text-sm hover:bg-gray-100 flex items-center'
											role='menuitem'
											tabIndex='-1'
											id='menu-item-1'
											disabled={renderProps.disabled}
										>
											<AiOutlineLogout className='mr-2' fontSize={21} />{' '}
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
					className='bg-black self-center text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center'
				>
					<IoMdAdd />
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
