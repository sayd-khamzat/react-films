import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {HomePage} from './pages/HomePage';
import {Navigation} from './components/Navigation/Navigation';
import {Page404} from './pages/Page404';
import {MoviesPage} from './pages/MoviesPage';
import {SeriesPage} from './pages/SeriesPage';
import {CartoonsPage} from './pages/CartoonsPage';
import {SingleMovie} from './pages/SingleMovie';

function App() {
    return (
        <>
            <Navigation/>
            <div className='h-screen'>
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/movies' element={<MoviesPage/>}/>
                    <Route path='/series' element={<SeriesPage/>}/>
                    <Route path='/cartoons' element={<CartoonsPage/>}/>
                    <Route path='/singlemovie' element={<SingleMovie/>}/>
                    <Route path='/*' element={<Page404/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App