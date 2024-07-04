import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSearch } from '../../actions/song.js'

const Searchbar = () => {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search) {
                dispatch(fetchSearch(search))
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search])
    return (
        <div className='searchbar gap-2 mb-5'>
            <img
                src='/assets/search-gray.svg'
                alt='search'
                className='object-contain w-6 h-6'
            />
            <input
                id='text'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search'
                className='no-focus searchbar_input w-full'
            />
        </div>
    )
}

export default Searchbar