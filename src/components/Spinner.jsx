import React from 'react';
import { Circles } from 'react-loader-spinner';

const fullPage = `h-screen absolute top-0 left-0`;
const defaultStyle = `h-full`;

const Spinner = ({ message, fullScreen }) => {
	return (
		<div
			className={`flex flex-col justify-center items-center relative w-full ${
				fullScreen ? fullPage : defaultStyle
			}`}
		>
			<Circles color='#ef4444' height={50} width={200} className='m-5' />

			<p className='text-lg text-center px-2'>{message}</p>
		</div>
	);
};

export default Spinner;
