import React, {useState} from 'react';

interface IPaginatorProps {
    currentPage: number
    setCurrentPage: (page: number) => void
    totalItemsCount: number | undefined
}

export function Paginator({currentPage, setCurrentPage, totalItemsCount}: IPaginatorProps) {

    const pagesCount = Math.ceil(totalItemsCount! / 10)
    const pages: Array<number> = []
    for (let i = 1; i < pagesCount; i++) {
        pages.push(i)
    }

    const portionSize = 5

    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    return (
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
    )
}