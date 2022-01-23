import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NoPins from '../assets/no-pins.svg';
import { client } from '../client';
import { Spinner } from '../components';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';

const Feed = () => {
	const [pins, setPins] = useState();
	const [loading, setLoading] = useState(false);
	const { categoryId } = useParams();

	useEffect(() => {
		setLoading(true);

		if (categoryId) {
			const query = searchQuery(categoryId);

			client.fetch(query).then((data) => {
				setPins(data);
				setLoading(false);
			});
		} else {
			client.fetch(feedQuery).then((data) => {
				setPins(data);
				setLoading(false);
			});
		}
	}, [categoryId]);

	const ideaName = categoryId || 'new';

	if (loading) {
		return <Spinner fullScreen message={`We are adding ${ideaName} ideas to your feed!`} />;
	}

	if (!pins?.length) {
		return (
			<>
				<div className='text-center text-primary w-full h-full mt-16 text-lg font-bold'>
					<h2 className='text-2xl'>No pins available yet</h2>
					<p className='font-semibold'>Be the first to add to this category!</p>
				</div>
				<img
					className='mx-auto mt-10 w-4/5 max-w-xl pointer-events-none'
					src={NoPins}
					alt='A sad face :('
				/>
			</>
		);
	}

	return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
