import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useSearchMovieQuery} from '../../store/kinopoisk/kinopoisk.api';
import {useDebounce} from '../../hooks/debouce';

export function Navigation() {

    const [search, setSearch] = useState('')
    const [dropdown, setDropdown] = useState(false)

    const debounced = useDebounce(search)
    const {isLoading, isError, data: movies} = useSearchMovieQuery(debounced, { // debounced идет как зависимость в эффектк
        skip: debounced.length < 2, // skip позволяет не отправлять запросы пока символов меньше 3
        refetchOnFocus: true // refetchOnFocus автоматически отправляет запрос при фокусе на браузера, т.е. после того как свернули браузер
    })

    useEffect(() => {
        setDropdown(debounced.length > 2 && movies?.length! > 0 || isLoading || isError) //true
    }, [debounced, movies])

    return (
        <div className='h-[80px] bg-slate-800 shadow-md text-white text-xl flex items-center'>
            <span>
                <Link to='/' className='font-bold px-6'>React Films</Link>
                <Link to='/movies' className='ml-60'>Фильмы</Link>
                <Link to='/series' className='ml-5'>Сериалы</Link>
                <Link to='/cartoons' className='ml-5'>Мультфильмы</Link>
            </span>

            <div className='relative flex w-[360px] h-[42px] ml-96 rounded bg-slate-700'>
                <svg className="h-6 w-6 mt-2 ml-3" width="24" viewBox="0 0 24 24" strokeWidth="2"
                     stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z"/>
                    <circle cx="10" cy="10" r="7"/>
                    <line x1="21" y1="21" x2="15" y2="15"/>
                </svg>
                <input type='text'
                       className='bg-slate-700 outline-0 w-full ml-3 text-base'
                       placeholder='Поиск'
                       value={search}
                       onChange={e => setSearch(e.target.value)}/>

                {dropdown &&
                    <ul className='list-none absolute rounded shadow-md bg-slate-700 top-[42px] max-h-[200px]
                    overflow-y-scroll left-0 right-0 w-full mt-2 px-4 py-2 text-base'>
                        {isLoading && <p className='text-center'>Загрузка...</p>}
                        {isError && <p className='text-center text-red-600'>Ошибка...</p>}
                        {movies?.map(movie => (
                            <li key={movie.id}
                                className='py-2 px-4 hover:bg-slate-800 rounded transition-colors cursor-pointer'>
                                {movie.name}
                            </li>
                        ))}
                    </ul>
                }
            </div>

        </div>
    )
}