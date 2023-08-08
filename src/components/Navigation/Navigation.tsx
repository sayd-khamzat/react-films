import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {SearchPanel} from './SearchPanel/SearchPanel';

export function Navigation() {
    return (
        <div className='h-[80px] shadow-md bg-slate-300 font-semibold text-slate-800 text-xl flex items-center'>
            <span>
                <NavLink to='/' className='font-bold px-6 text-indigo-600'>React Films</NavLink>
                <NavLink to='/movies' className={navData => navData.isActive
                    ? 'ml-60 transition-colors text-indigo-600'
                    : 'ml-60 hover:text-indigo-600 transition-colors'}>Фильмы</NavLink>
                <NavLink to='/series' className={navData => navData.isActive
                    ? 'ml-5 transition-colors text-indigo-600'
                    : 'ml-5 hover:text-indigo-600 transition-colors'}>Сериалы</NavLink>
                <NavLink to='/cartoons' className={navData => navData.isActive
                    ? 'ml-5 transition-colors text-indigo-600'
                    : 'ml-5 hover:text-indigo-600 transition-colors'}>Мультфильмы</NavLink>
                <NavLink to='/animated-series' className={navData => navData.isActive
                    ? 'ml-5 transition-colors text-indigo-600'
                    : 'ml-5 hover:text-indigo-600 transition-colors'}>Анимационные сериалы</NavLink>
            </span>
            <SearchPanel/>
        </div>
    )
}