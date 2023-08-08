import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {HomePage} from './pages/HomePage';
import {Navigation} from './components/Navigation/Navigation';
import {Page404} from './pages/Page404';
import {MoviesPage} from './pages/MoviesPage';
import {SingleMovie} from './pages/SingleMovie';
import {Footer} from './components/Footer/Footer';

function App() {
    return (
        <>
            <Navigation/>
            <div className='h-screen'>
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/movies' element={<MoviesPage type='movie' name='Фильмы'/>}/>
                    <Route path='/series' element={<MoviesPage type='tv-series' name='Сериалы'/>}/>
                    <Route path='/cartoons' element={<MoviesPage type='cartoon' name='Мультфильмы'/>}/>
                    <Route path='/animated-series' element={<MoviesPage type='animated-series' name='Анимационные сериалы'/>}/>
                    <Route path='/singlemovie' element={<SingleMovie/>}/>
                    <Route path='/*' element={<Page404/>}/>
                </Routes>
                <Footer/>
            </div>
        </>
    )
}

export default App