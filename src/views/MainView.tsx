import DataTable from '@/components/DataTable'
import Search from '@/components/Search'
import React from 'react'

const MainView: React.FC = () => {
    return (
        <div className='flex flex-col items-end w-5/6 h-screen p-1'>
            <div className='w-1/4'>
                <Search />
            </div>
            <div className='pt-10'>
                <DataTable />
            </div>
        </div>
    )
}

export default MainView
