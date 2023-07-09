import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {HomePage} from './pages/HomePage';
import {Navigation} from './components/Navigation/Navigation';
import {Page404} from './pages/Page404';
import {MoviesPage} from './pages/MoviesPage';
import {SeriesPage} from './pages/SeriesPage';
import {CartoonsPage} from './pages/CartoonsPage';

function App() {
    return (
        <>
            <Navigation/>
            <div className='bg-slate-700 w-screen h-screen'>
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/movies' element={<MoviesPage/>}/>
                    <Route path='/series' element={<SeriesPage/>}/>
                    <Route path='/cartoons' element={<CartoonsPage/>}/>
                    <Route path='/*' element={<Page404/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App