import React from 'react';
import {useAppSelector} from '../hooks/redux';

export function SingleMovie() {

    const movie = useAppSelector(state => state.kinopoisk.singleMovie)

    return (
        <>
            {movie &&
                <div className='grid mx-auto w-[90%] h-screen pt-10 text-slate-300'>

                    <h1 className='text-5xl font-bold text-center'>{movie.name}</h1>

                    {/*<iframe width="560" height="315" src={movie.videos.trailers[3].url}*/}
                    {/*        title="YouTube video player" frameBorder="0"*/}
                    {/*        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"*/}
                    {/*        allowFullScreen></iframe>*/}


                    <div className='grid grid-cols-2 mt-5'>
                        <p className='w-[700px] pr-10 text-left'>{movie.description}</p>
                        <img src={movie.poster?.url} alt='Poster'
                             className='rounded h-1/2 shadow-md'/>
                    </div>

                </div>
            }
        </>
    )
}