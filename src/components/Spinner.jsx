import React from 'react';
import GridLoader from 'react-spinners/GridLoader';

const fullPage = `h-screen top-0 left-0`;
const defaultStyle = `h-full`;

const Spinner = ({ message, fullScreen }) => {
	return (
		<div
			className={`flex flex-col justify-center my-auto items-center w-full ${
				fullScreen ? fullPage : defaultStyle
			}`}
		>
			<GridLoader color='#ef4444' size={25} className='m-5' />

			<p className='text-lg text-center px-2 text-primary my-10'>{message}</p>
		</div>
	);
};

export default Spinner;
