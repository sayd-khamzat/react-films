import React, {useEffect} from 'react';
import {useLazyGetMoviesQuery} from '../store/kinopoisk/kinopoisk.api';
import {useActions} from '../hooks/actions';
import {useNavigate} from 'react-router-dom';

export function MoviesPage() {

    const [getMovies, {data: moviesData, isLoading, isError}] = useLazyGetMoviesQuery()
    const {addMovieId} = useActions()
    const navigate = useNavigate()

    useEffect(() => {
        getMovies('movie')
    }, [])

    const clickHandler = (id: number) => {
        addMovieId(id)
        navigate('/singlemovie')
    }

    return (
        <div className='mx-auto pt-5 w-[90%] text-slate-800'>
            <h1 className='text-center text-3xl font-semibold'>Фильмы</h1>

            {isLoading && <p className='text-center mt-5 text-lg'>Загрузка фильмов...</p>}
            {isError && <p className='text-red-600 text-center mt-5 text-lg'>Произошла какая-то ошибка</p>}

            <div className='grid grid-cols-5 mt-14 justify-items-center'>
                {moviesData?.docs.map(movie =>
                    <div key={movie.id}>
                        <div className='bg-slate-300 w-[200px] h-[470px] text-sm rounded shadow-md mb-10 hover:text-indigo-600 transition-colors cursor-pointer'>
                            <img src={movie.poster.url}
                                 onClick={() => clickHandler(movie.id)}
                                 className='mt-3 rounded'
                                 alt="logo" >
                            </img>
                            <div className='ml-1 bg-slate-300'>
                                <h1 className='text-lg font-semibold mb-2'>{movie.name}</h1>
                                <p>Жанры: {movie.genres.map((g, i) => <span key={i}>{g.name} </span>)}</p>
                                <p>{movie.year} <span>год</span></p>
                                <p>Рейтинг: {movie.rating.kp}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}