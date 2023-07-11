import React from 'react';
import {Link} from 'react-router-dom';
import {SearchPanel} from './SearchPanel/SearchPanel';

export function Navigation() {

    return (
        <div className='h-[80px] bg-slate-800 shadow-md text-slate-300 text-xl flex items-center'>
            <span>
                <Link to='/' className='font-bold px-6'>React Films</Link>
                <Link to='/movies' className='ml-60'>Фильмы</Link>
                <Link to='/series' className='ml-5'>Сериалы</Link>
                <Link to='/cartoons' className='ml-5'>Мультфильмы</Link>
            </span>
            <SearchPanel/>
        </div>
    )
}