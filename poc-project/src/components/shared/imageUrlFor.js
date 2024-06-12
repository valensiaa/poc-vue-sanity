import imageUrlBuilder from '@sanity/image-url';
import client from '../../client';

let imageBuilder = imageUrlBuilder(client);

export const imageUrlFor = (source) => {
    return imageBuilder.image(source);
};
