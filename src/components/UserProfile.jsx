import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { GoogleLogout } from 'react-google-login';
import { AiOutlineLogout } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { client } from '../client';
import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';
import GoogleLogoutPopup from './GoogleLogoutPopup';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const activeBtnStyles =
	'bg-button text-button font-bold p-2 rounded-full w-20 outline-none transition-none';
const notActiveBtnStyles =
	'bg-secondary text-primary font-bold p-2 rounded-full w-20 outline-none transition-none';

const UserProfile = () => {
	const [user, setUser] = useState();
	const [pins, setPins] = useState();
	const [text, setText] = useState('Created');
	const [activeBtn, setActiveBtn] = useState('created');
	const navigate = useNavigate();
	const { userId } = useParams();

	const User =
		localStorage.getItem('user') !== 'undefined'
			? JSON.parse(localStorage.getItem('user'))
			: localStorage.clear();

	useEffect(() => {
		const query = userQuery(userId);
		client.fetch(query).then((data) => {
			setUser(data[0]);
		});
	}, [userId]);

	useEffect(() => {
		if (text === 'Created') {
			const createdPinsQuery = userCreatedPinsQuery(userId);

			client.fetch(createdPinsQuery).then((data) => {
				setPins(data);
			});
		} else {
			const savedPinsQuery = userSavedPinsQuery(userId);

			client.fetch(savedPinsQuery).then((data) => {
				setPins(data);
			});
		}
	}, [text, userId]);

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

	if (!user) return <Spinner message='Loading profile' />;

	return (
		<div className='relative pb-2 h-full justify-center items-center'>
			<div className='flex flex-col pb-5'>
				<div className='relative flex flex-col mb-7'>
					<div className='flex flex-col justify-center items-center'>
						<img
							className=' w-full h-370 2xl:h-510 shadow-lg object-cover'
							src='https://source.unsplash.com/1600x900/?nature,photography,technology'
							alt='user-pic'
						/>
						<img
							className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
							src={user.image}
							alt='user-pic'
						/>
					</div>
					<h1 className='font-bold text-3xl text-center mt-3 text-primary'>{user.userName}</h1>
					<div className='absolute top-0 z-1 right-0 p-2'>
						{userId === User.googleId && (
							<div
								onClick={submit}
								className='bg-primary rounded-full cursor-pointer outline-none shadow-md'
							>
								<GoogleLogout
									clientId={`${process.env.REACT_APP_GOOGLE_TOKEN_API}`}
									render={(renderProps) => (
										<button
											type='button'
											className=' bg-white opacity-75 hover:opacity-100 p-4 rounded-full cursor-pointer outline-none shadow-md'
											// onClick={renderProps.onClick}
											disabled={renderProps.disabled}
										>
											<AiOutlineLogout color='red' fontSize={21} />
										</button>
									)}
									onLogoutSuccess={logout}
									cookiePolicy='single_host_origin'
								/>
							</div>
						)}
					</div>
				</div>
				<div className='text-center mb-7 w-full mx-auto'>
					<button
						type='button'
						onClick={(e) => {
							setText(e.target.textContent);
							setActiveBtn('created');
						}}
						className={`${
							activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles
						} mr-4`}
					>
						Created
					</button>
					<button
						type='button'
						onClick={(e) => {
							setText(e.target.textContent);
							setActiveBtn('saved');
						}}
						className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
					>
						Saved
					</button>
				</div>

				<div className='px-2'>
					<MasonryLayout pins={pins} />
				</div>

				{pins?.length === 0 && (
					<div className='flex justify-center font-bold items-center text-primary w-full text-1xl mt-2'>
						No Pins Found!
					</div>
				)}
			</div>
		</div>
	);
};

export default UserProfile;
