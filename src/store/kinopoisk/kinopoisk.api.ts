import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IMovie, ServerResponse} from '../../models/models';

export const kinopoiskApi = createApi({
    reducerPath: 'kinopoisk/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.kinopoisk.dev',
        headers: {
            'X-API-KEY': 'N8XMFNS-C88MVFF-G9ZGFRS-CHC4YF8'
        }
    }),
    endpoints: build => ({
        searchMovie: build.query<IMovie[], string>({ //1 generic - что мы получаем, 2 - какой параметр мы принимаем для запроса
            // query: () => 'search/users'
            query: (search: string) => ({
                url: '/v1.2/movie/search',
                params: {
                    query: search,
                    limit: 10
                }
            }),
            transformResponse: (response: ServerResponse<IMovie>) => response.docs
        })
    })
})

export const {useSearchMovieQuery} = kinopoiskApi