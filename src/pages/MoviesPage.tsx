import React, {useEffect, useState} from 'react';
import {useLazyGetMoviesQuery} from '../store/kinopoisk/kinopoisk.api';
import {useActions} from '../hooks/actions';
import {useNavigate} from 'react-router-dom';
import {Paginator} from '../components/common/Paginator';
import {Preloader} from '../components/common/Preloader';

interface IMoviesPage {
    type: string
    name: string
}

export function MoviesPage({type, name}: IMoviesPage) {

    const [currentPage, setCurrentPage] = useState(1)

    const [getMovies, {data: moviesData, isFetching, isError}] = useLazyGetMoviesQuery()
    const {addMovieId} = useActions()
    const navigate = useNavigate()

    useEffect(() => { // установка номера страницы на 1 при первой отрисовке
        setCurrentPage(1)
    }, [type])

    useEffect(() => {
        window.scrollTo({ // автопрокрутка вверх при перелистывании страниц
            top: 0,
            behavior: 'smooth'
        })
        const params = {
            type: type,
            page: currentPage
        }
        getMovies(params)
    }, [currentPage, type])

    const clickHandler = (id: number) => {
        addMovieId(id)
        navigate('/singlemovie')
    }

    return (
        <>
            <div className='mx-auto pt-5 w-[90%] text-slate-800'>
                <h1 className='text-center text-3xl font-semibold'>{name}</h1>

                {isFetching || isError
                    ? isFetching
                        ? <Preloader/>
                        : <p className='text-red-600 text-center mt-5 text-lg font-semibold'>Произошла какая-то
                            ошибка...</p>
                    : <div className='grid grid-cols-5 mt-14 justify-items-center'>
                        {moviesData?.docs.map(movie =>
                            <div key={movie.id}>
                                <div className='bg-slate-300 w-[200px] h-[500px] text-sm rounded-lg shadow-md mb-10 hover:text-indigo-600 transition-colors cursor-pointer'
                                     onClick={() => clickHandler(movie.id)}>
                                    <img src={movie.poster.url}
                                         className='mt-3 rounded'
                                         alt="logo">
                                    </img>
                                    <div className='ml-1 bg-slate-300'>
                                        <h1 className='text-lg font-semibold mb-2'>{movie.name}</h1>
                                        <p>Жанры: {movie.genres.map((g, i) => <span key={i}>{g.name}, </span>)}</p>
                                        <p>{movie.year} <span>год</span></p>
                                        <p>Рейтинг: {movie.rating.kp}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                }
            </div>
            <Paginator currentPage={currentPage}
                       setCurrentPage={setCurrentPage}
                       totalItemsCount={moviesData?.total}/>
        </>
    )
}