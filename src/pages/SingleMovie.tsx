import React from 'react';
import {useAppSelector} from '../hooks/redux';
import {useGetSingleMovieQuery} from '../store/kinopoisk/kinopoisk.api';
import {Preloader} from '../components/common/Preloader';
import {useActions} from '../hooks/actions';

export function SingleMovie() {

    window.scrollTo({ // автопрокрутка вверх при перелистывании страниц
        top: 0,
        behavior: 'smooth'
    })

    const {movieId} = useAppSelector(state => state.kinopoisk)

    const {data: movie, isFetching, isError} = useGetSingleMovieQuery(movieId)

    const {addMovieId} = useActions()

    const clickHandler = (id: number) => {
        addMovieId(id)
    }

    return (
        <div className='grid mx-auto w-[90%] pt-5 text-slate-800'>
            {isFetching || isError ?
                isFetching
                    ? <Preloader/>
                    : <p className='text-red-600 text-center pt-5 text-lg'>Произошла какая-то ошибка</p>
                : movie &&
                <>
                    <h1 className='text-center text-3xl font-semibold'>{movie.name}</h1>

                    <div className='flex mt-14'>
                        <img src={movie.poster?.url} alt='Poster'
                             className='rounded h-[500px] shadow-md'/>
                        <div className='ml-52'>
                            <p>
                                <span className='font-semibold'>Жанры: </span>
                                {movie.genres.map((g, i) => <span key={i}>{g.name}, </span>)}
                            </p>
                            <p>
                                <span className='font-semibold'>Дата премьера: </span>
                                {movie.premiere
                                    ? movie.premiere.world
                                : 'Неизвестно'}
                            </p>
                            <p>
                                <span className='font-semibold'>Рейтинг в Кинопоиске: </span>
                                {movie.rating.kp}
                            </p>
                            <p>
                                <span className='font-semibold'>В фильме снимались: </span>
                                {movie.persons.map((p, i) => <span key={i}>{p.name}, </span>)}
                            </p>

                            <div className='mt-14 text-left'>
                                <span className='font-semibold'>Описание фильма</span>
                                <p>{movie.description}</p>
                            </div>

                            <h3 className='text-2xl mt-14 font-semibold'>Трейлеры</h3>
                            <div className='grid grid-cols-2'>
                                {movie.videos
                                    ? movie.videos.trailers.map((trailer, i) => <iframe key={i}
                                                                              className='mt-5'
                                                                              width="400" height="200"
                                                                              src={trailer.url}
                                                                              title="YouTube video player"
                                                                              frameBorder="0"
                                                                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                                              allowFullScreen></iframe>)
                                : 'Трейлеры не найдены'
                                }
                            </div>

                            <h3 className='text-2xl mt-14 font-semibold'>Похожие фильмы</h3>
                            <div className='grid grid-cols-5'>
                                {movie.similarMovies.map(m => <div key={m.id}
                                                                   className='w-[200px] mt-5'
                                                                   onClick={() => clickHandler(m.id)}>
                                    <img src={m.poster.url} className='h-[300px]'/>
                                    <h3 className='text-center font-semibold'>{m.name}</h3>
                                </div>)}
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}