import React from 'react';
import {Link} from 'react-router-dom';
import {SearchPanel} from './SearchPanel/SearchPanel';

export function Navigation() {

    return (
        <div className='h-[80px] shadow-md bg-slate-300 font-semibold text-slate-800 text-xl flex items-center'>
            <span>
                <Link to='/' className='font-bold px-6 hover:text-indigo-600 transition-colors'>React Films</Link>
                <Link to='/movies' className='ml-60 hover:text-indigo-600 transition-colors'>Фильмы</Link>
                <Link to='/series' className='ml-5 hover:text-indigo-600 transition-colors'>Сериалы</Link>
                <Link to='/cartoons' className='ml-5 hover:text-indigo-600 transition-colors'>Мультфильмы</Link>
            </span>
            <SearchPanel/>
        </div>
    )
}