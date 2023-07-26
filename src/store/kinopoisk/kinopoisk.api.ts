import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IMovie, ISingleMovie, ServerResponse} from '../../models/models';

export const kinopoiskApi = createApi({
    reducerPath: 'kinopoisk/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.kinopoisk.dev',
        headers: {
            // 'X-API-KEY': 'N8XMFNS-C88MVFF-G9ZGFRS-CHC4YF8'
            'X-API-KEY': '3N90HJG-YSTM4G3-GC474H9-F69567P'
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
        }),
        getSingleMovie: build.query<ISingleMovie, number | null>({
            query: (id: number) => ({
                url: `/v1.3/movie/${id}`
            })
        }),
        getMovies: build.query<ServerResponse<ISingleMovie>, string>({
            query: (type: string) => ({
                url: `/v1.3/movie`,
                params: {
                    type: type,
                    page: 2
                }
            })
        })
    })
})

export const {
    useSearchMovieQuery,
    useGetSingleMovieQuery, useLazyGetSingleMovieQuery,
    useLazyGetMoviesQuery
} = kinopoiskApi