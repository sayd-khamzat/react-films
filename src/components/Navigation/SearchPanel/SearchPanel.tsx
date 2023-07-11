import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDebounce} from '../../../hooks/debouce';
import {useLazyGetSingleMovieQuery, useSearchMovieQuery} from '../../../store/kinopoisk/kinopoisk.api';
import {useActions} from '../../../hooks/actions';

export function SearchPanel() {

    const [search, setSearch] = useState('')
    const [dropdown, setDropdown] = useState(false)

    const debounced = useDebounce(search)

    const {isLoading, isError, error, data: moviesList} = useSearchMovieQuery(debounced, { // debounced идет как зависимость в эффектк
        skip: debounced.length < 2, // skip позволяет не отправлять запросы пока символов меньше 3
        refetchOnFocus: true // refetchOnFocus автоматически отправляет запрос при фокусе на браузера, т.е. после того как свернули браузер
    })

    const [fetchMovie, {data: movieData}] = useLazyGetSingleMovieQuery()

    const {addMovie} = useActions()

    useEffect(() => {
        setDropdown(debounced.length > 2 || isLoading || isError) //true
    }, [debounced, moviesList])

    const clickHandler = (id: number) => {
        fetchMovie(id)
        setSearch('')
        setDropdown(false)
    }

    useEffect(() => {
        addMovie(movieData)
    }, [movieData])


    let errMsg
    if (error) { // вытаскивание сообщения ошибки
        if ('status' in error) {
            // you can access all properties of `FetchBaseQueryError` here
            errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
        } else {
            // you can access all properties of `SerializedError` here
            errMsg = error.message
        }
    }

    return (
        <div className='relative flex w-[360px] h-[42px] ml-96 rounded bg-slate-700'>
            <svg className="h-6 w-6 mt-2 ml-3" width="24" viewBox="0 0 24 24" strokeWidth="2"
                 stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z"/>
                <circle cx="10" cy="10" r="7"/>
                <line x1="21" y1="21" x2="15" y2="15"/>
            </svg>
            <input type='text'
                   className='bg-slate-700 outline-0 w-full ml-3 text-base shadow-md'
                   placeholder='Поиск'
                   value={search}
                   onChange={e => setSearch(e.target.value)}/>

            {dropdown &&
                <ul className='list-none absolute rounded shadow-md bg-slate-700 top-[42px] max-h-[200px]
                    overflow-y-scroll left-0 right-0 w-full mt-2 px-4 py-2 text-base'>

                    {isLoading && <p className='text-center py-2 px-4'>Загрузка...</p>}
                    {isError && <p className='text-center text-red-600 py-2 px-4'>{errMsg}</p>}

                    {moviesList?.length === 0
                        ? <p className='text-center py-2 px-4'>Ничего не найдено</p>
                        : moviesList?.map(movie => (
                            movie.alternativeName &&
                            <li key={movie.id}
                                onClick={() => clickHandler(movie.id)}
                                className='py-2 px-4 hover:bg-slate-800 hover:shadow-md rounded transition-colors cursor-pointer'>
                                <Link to='/singlemovie'>
                                    {movie.name ? movie.name : movie.alternativeName}
                                </Link>
                            </li>
                        ))}
                </ul>
            }
        </div>
    )
}