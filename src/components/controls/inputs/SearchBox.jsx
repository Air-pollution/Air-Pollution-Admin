import React, { memo } from 'react'

const SearchBox = ({ onSearch }) => {
    const handleInputChange = (event) => {
        onSearch(event.target.value);
    };

    return (
        <div className='relative shadow-sm active:text-black'>
            <i className="ri-search-line absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 text-xl" />
            <input type="text" name="search" id="search"
                placeholder='Search...'
                onChange={handleInputChange}
                className='text-md pl-14 py-3 px-5 w-80 bg-white border border-gray-300 focus:outline-none active:outline-none rounded-lg' />
        </div>
    )
}

export default memo(SearchBox)