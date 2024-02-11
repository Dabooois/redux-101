import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_PATH = 'http://127.0.0.1:8080/';

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: API_PATH }),
	tagTypes: ['Posts', 'Users'],
	endpoints: (builder) => ({}),
});
