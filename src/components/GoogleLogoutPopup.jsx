import React from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Bye from '../assets/bye.svg';

const GoogleLogoutPopup = ({ onClose, logout }) => {
	return (
		<div className='absolute right-2/4 bottom-2/4 translate-x-2/4 translate-y-2/4 py-8 px-4 md:px-8 lg:px-16 bg-gray-300 rounded-md bg-opacity-90 w-11/12 sm:w-1/2 text-center flex flex-col justify-center align-center'>
			<h1 className='text-3xl font-bold'>Log out?</h1>
			<p className='font-thin text-lg mt-2'>Are you sure you want to leave right now?</p>
			<img
				className='max-h-52 my-2 pointer-events-none'
				src={Bye}
				alt='Woman waving and sharing love'
			/>
			<div className='w-full my-3 justify-evenly flex'>
				<button
					className='bg-red-500 hover:bg-red-600 text-sm sm:text-base font-semibold text-button shadow-sm rounded-full px-3 md:px-4 py-2'
					onClick={() => {
						logout();
						onClose();
					}}
				>
					Yes, log me out
				</button>
				<button
					className='bg-white hover:bg-gray-100 text-sm sm:text-base font-semibold shadow-sm rounded-full px-3 md:px-4 py-2'
					onClick={onClose}
				>
					No, I want to stay
				</button>
			</div>
		</div>
	);
};

export default GoogleLogoutPopup;
