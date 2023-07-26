import React from 'react';
import {useAppSelector} from '../hooks/redux';
import {useGetSingleMovieQuery} from '../store/kinopoisk/kinopoisk.api';

export function SingleMovie() {

    const {movieId} = useAppSelector(state => state.kinopoisk)

    const {data: movie, isLoading, isError} = useGetSingleMovieQuery(movieId)

    return (
        <div className='grid mx-auto w-[90%] h-screen pt-5 text-slate-300'>

            {isLoading && <p className='text-center pt-5 text-lg'>Загрузка фильма...</p>}
            {isError && <p className='text-red-600 text-center pt-5 text-lg'>Произошла какая-то ошибка</p>}

            {movie &&
                <>
                    <h1 className='text-3xl font-bold text-center'>{movie.name}</h1>

                    {/*<iframe width="560" height="315" src={movie.videos.trailers[3].url}*/}
                    {/*        title="YouTube video player" frameBorder="0"*/}
                    {/*        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"*/}
                    {/*        allowFullScreen></iframe>*/}

                    <div className='grid grid-cols-2 mt-5'>
                        <p className='w-[700px] pr-10 text-left'>{movie.description}</p>
                        <img src={movie.poster?.url} alt='Poster'
                             className='rounded h-1/2 shadow-md'/>
                    </div>
                </>
            }
        </div>
    )
}