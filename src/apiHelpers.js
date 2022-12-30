import axios from 'axios';

const galleryApi = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '30604472-f2fc6ecb7ae367c0d678b061b',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const getGalleryService = async (query, page = 1) => {
  const { data } = await galleryApi.get('', {
    params: {
      q: query,
      page,
    },
  });
  return data;
};
