import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { sanityApi, sanityId } from './env/envVariables';

export const client = sanityClient({
	projectId: sanityId,
	dataset: 'production',
	apiVersion: '2021-11-16',
	useCdn: true,
	token: sanityApi,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
