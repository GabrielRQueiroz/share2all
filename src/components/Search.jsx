import React, { useEffect, useState } from 'react';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import NotFound from '../assets/not-found.svg';

const Search = ({ searchTerm }) => {
	const [pins, setPins] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (searchTerm !== '') {
			setLoading(true);
			const query = searchQuery(searchTerm.toLowerCase());
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
	}, [searchTerm]);

	return (
		<div>
			{loading && <Spinner fullScreen message='Searching pins' />}
			{pins?.length !== 0 && <MasonryLayout pins={pins} />}
			{pins?.length === 0 && searchTerm !== '' && !loading && (
				<>
					<div className='text-center text-primary w-full mt-8 text-lg font-bold'>
						<h2 className='text-2xl'>No pin was found :(</h2>
						<p className='font-semibold'>Try other keywords 🔎</p>
					</div>
					<img
						className='mx-auto mt-10 w-4/5 max-w-xl pointer-events-none'
						src={NotFound}
						alt='A sad face :('
					/>
				</>
			)}
		</div>
	);
};

export default Search;
