import { ProductState } from '@/context/ProductProvider';
import DataGrid, { Column, Paging } from 'devextreme-react/data-grid';
import React from 'react'

const DataTable: React.FC = () => {

    // iz konteksta uzimamo filtrirane produkte (one koje smo trazili) i aktivne kolone
    // filtrirane produkte prosljedjujemo u tabelu dok aktivne kolone su one kolone koje zelimo da nam prikaze
    const { filteredProducts, activeColumns } = ProductState();


    // provjeravamo ukoliko ima aktivnih kolona u nizu i ispisujemo produkte
    // ukoliko nema aktivnih kolona ispisujemo poruku da nema odabranih kolona za prikaz
    return (
        <>
            {activeColumns.length > 0 ? <DataGrid
                dataSource={filteredProducts}
                showBorders={true}
            >
                {activeColumns && activeColumns.map((col, index) =>
                    <Column key={index} dataField={col.naziv} caption={col.naziv.charAt(0).toUpperCase() + col.naziv.slice(1)} /> // caption prop ima prvo slovo uppercase
                )}
                <Paging defaultPageSize={20} />
            </DataGrid> : <div className='flex justify-center w-screen'>Nemas odabranih kolona za prikaz!</div>}
        </>
    )
}

export default DataTable
