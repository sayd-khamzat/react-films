import React, {useEffect, useState} from 'react';
import {useLazyGetMoviesQuery} from '../store/kinopoisk/kinopoisk.api';
import {useActions} from '../hooks/actions';
import {useNavigate} from 'react-router-dom';

export function MoviesPage() {

    const [currentPage, setCurrentPage] = useState(1)

    const [getMovies, {data: moviesData, isLoading, isError}] = useLazyGetMoviesQuery()
    const {addMovieId} = useActions()
    const navigate = useNavigate()

    useEffect(() => {
        const params = {
            type: 'movie',
            page: currentPage
        }
        getMovies(params)
    }, [currentPage])

    const clickHandler = (id: number) => {
        addMovieId(id)
        navigate('/singlemovie')
    }

    const pagesCount = Math.ceil(moviesData?.total! / 10)
    const pages: Array<number> = []
    for (let i = 1; i < pagesCount; i++) {
        pages.push(i)
    }

    const portionSize = 5

    const portionCount = Math.ceil(pagesCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    return (
        <>
            <div className='mx-auto pt-5 w-[90%] text-slate-800'>
                <h1 className='text-center text-3xl font-semibold'>Фильмы</h1>

                {isLoading && <p className='text-center mt-5 text-lg font-semibold'>Загрузка фильмов...</p>}
                {isError &&
                    <p className='text-red-600 text-center mt-5 text-lg font-semibold'>Произошла какая-то ошибка...</p>}

                <div className='grid grid-cols-5 mt-14 justify-items-center'>
                    {moviesData?.docs.map(movie =>
                        <div key={movie.id}>
                            <div
                                className='bg-slate-300 w-[200px] h-[470px] text-sm rounded shadow-md mb-10 hover:text-indigo-600 transition-colors cursor-pointer'>
                                <img src={movie.poster.url}
                                     onClick={() => clickHandler(movie.id)}
                                     className='mt-3 rounded'
                                     alt="logo">
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

            {/*pagination*/}
            <div className='text-center font-semibold text-lg text-slate-800'>

                {portionNumber > 1 && <span>
                    <button className='hover:text-indigo-600 transition-colors'
                            onClick={() => {setPortionNumber(1)}}>{'<<<'}</button>
                    <button className='hover:text-indigo-600 ml-3 transition-colors'
                            onClick={() => {setPortionNumber(portionNumber - 1)}}>{'<'}</button>
                </span>}

                {pages
                    .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                    .map(page =>
                        <button key={page} className={page === currentPage
                            ? 'py-2 px-4 m-1 mb-5 border-t border-indigo-600 text-indigo-600 transition-colors'
                            : 'py-2 px-4 m-1 mb-5 rounded hover:text-indigo-600 transition-colors'}
                                onClick={() => setCurrentPage(page)}>{page}</button>)}

                {portionNumber < portionCount && <span>
                    <button className='hover:text-indigo-600 transition-colors'
                            onClick={() => {setPortionNumber(portionNumber + 1)}}>{'>'}</button>
                    <button className='hover:text-indigo-600 ml-3 transition-colors'
                            onClick={() => {setPortionNumber(portionCount)}}>{'>>>'}</button>
                </span>}
            </div>
        </>
    )
}