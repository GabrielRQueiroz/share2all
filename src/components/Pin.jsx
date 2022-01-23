import React, { useState } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { client, urlFor } from '../client';
import { fetchUser } from '../utils/fetchUser';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
import Deleting from '../assets/delete.svg';

const Pin = ({ pin }) => {
	const [postHovered, setPostHovered] = useState(false);
	const [savingPost, setSavingPost] = useState(false);
	const navigate = useNavigate();
	const user = fetchUser();

	const { postedBy, image, _id, destination } = pin;

	const deletePin = (id) => {
		client.delete(id).then(() => {
			window.location.reload();
		});
	};

	const deleteConfirmation = (id) => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className='absolute right-2/4 bottom-2/4 translate-x-2/4 translate-y-2/4 py-8 px-4 md:px-8 lg:px-16 bg-gray-300 rounded-md bg-opacity-90 w-11/12 sm:w-1/2 text-center flex flex-col justify-center align-center'>
						<h1 className='text-3xl font-bold'>Delete pin?</h1>
						<p className='font-thin text-lg mt-2'>You won't be able to undo this!</p>
						<img
							className='max-h-52 my-2 pointer-events-none'
							src={Deleting}
							alt='Guy throwing a piece of paper in a trash bin'
						/>
						<div className='w-full my-3 justify-evenly flex'>
							<button
								className='bg-red-500 hover:bg-red-600 text-sm sm:text-base font-semibold text-button shadow-sm rounded-full px-3 md:px-4 py-2'
								onClick={() => {
									deletePin(id);
									onClose();
								}}
							>
								Yes, delete it
							</button>
							<button
								className='bg-white hover:bg-gray-100 text-sm sm:text-base font-semibold shadow-sm rounded-full px-3 md:px-4 py-2'
								onClick={onClose}
							>
								No, keep it
							</button>
						</div>
					</div>
				);
			},
		});
	};

	let alreadySaved = pin?.save?.filter((item) => item?.postedBy?._id === user?.googleId);
	alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

	const savePin = (id) => {
		if (alreadySaved?.length === 0) {
			setSavingPost(true);

			client
				.patch(id)
				.setIfMissing({ save: [] })
				.insert('after', 'save[-1]', [
					{
						_key: uuidv4(),
						userId: user?.googleId,
						postedBy: {
							_type: 'postedBy',
							_ref: user?.googleId,
						},
					},
				])
				.commit()
				.then(() => {
					window.location.reload();
					setSavingPost(false);
				});
		}
	};

	return (
		<div className='m-2'>
			<div
				onMouseEnter={() => setPostHovered(true)}
				onMouseLeave={() => setPostHovered(false)}
				onClick={() => navigate(`/pin-detail/${_id}`)}
				className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
			>
				<img
					className='rounded-lg w-full'
					src={urlFor(image).width(250).url()}
					alt='user-post'
				/>
				{postHovered && (
					<div className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'>
						<div className='flex items-center justify-between'>
							<div className='flex gap-2'>
								<a
									href={`${image?.asset?.url}?dl=`}
									download
									onClick={(e) => {
										e.stopPropagation();
									}}
									className='bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
								>
									<MdDownloadForOffline />
								</a>
							</div>
							{alreadySaved?.length !== 0 ? (
								<button
									type='button'
									className='bg-button opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
								>
									{pin?.save?.length} Saved
								</button>
							) : (
								<button
									onClick={(e) => {
										e.stopPropagation();
										savePin(_id);
									}}
									type='button'
									className='bg-button opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
								>
									{pin?.save?.length} {savingPost ? 'Saving' : 'Save'}
								</button>
							)}
						</div>
						<div className='flex justify-between items-center w-full'>
							{destination?.slice(8).length > 0 ? (
								<a
									href={destination}
									target='_blank'
									className='bg-white flex items-center gap-1 text-dark font-bold p-2 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'
									rel='noreferrer'
								>
									{' '}
									<BsFillArrowUpRightCircleFill />
									{destination?.slice(8, 17)}...
								</a>
							) : undefined}
							{postedBy?._id === user?.googleId && (
								<button
									type='button'
									onClick={(e) => {
										e.stopPropagation();
										deleteConfirmation(_id);
									}}
									className='bg-white p-1 rounded-full w-9 h-9 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none'
								>
									<AiTwotoneDelete />
								</button>
							)}
						</div>
					</div>
				)}
			</div>
			<Link to={`/user-profile/${postedBy?._id}`} className='flex gap-2 mt-2 items-center'>
				<img
					className='w-8 h-8 rounded-full object-cover'
					src={postedBy?.image}
					alt='user-profile'
				/>
				<p className='font-semibold capitalize text-primary'>{postedBy?.userName}</p>
			</Link>
		</div>
	);
};

export default Pin;
