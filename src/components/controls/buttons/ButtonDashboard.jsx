import React, { memo } from 'react';

const ButtonDashboard = ({ title, icon, number, color }) => {
    return (
        <div className='flex-shrink max-w-full px-0 w-full sm:w-1/2 lg:w-1/4 mb-6'>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full">
                <div className='flex items-center justify-between pt-6 px-6 relative text-sm font-semibold'>
                    {title}
                    <div className={`ltr:float-right rtl:float-left text-${color}`}>
                        {number}
                    </div>
                </div>
                <div className='flex flex-row justify-between px-6 py-4'>
                    <div className={`flex items-center justify-center w-14 h-14 rounded-full text-${color}-500 bg-${color}-100 dark:bg-${color}-900 dark:bg-opacity-40 relative text-center`}>
                        <i className={icon}></i>
                    </div>
                    <div className='self-center text-3xl'>
                        {number}
                    </div>
                </div>
                <div className='px-6 pb-6'>
                    <a href="#" className='hover:text-indigo-500 text-sm'>
                        View more...
                    </a>
                </div>
            </div>
        </div>
    );
};

export default memo(ButtonDashboard);
