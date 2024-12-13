import { ProductState } from '@/context/ProductProvider'
import React from 'react'
import { Column } from "../models/models"

const SidebarView: React.FC = () => {

    const { activeColumns, inactiveColumns, setActiveColumns, setInactiveColumns } = ProductState();

    // ova funkcija sluzi za aktiviranje neke kolone za prikaz
    const handleAddColumn = (column: Column) => {

        let actives = [...activeColumns, column]; // actives je niz koji prosiruje postojeci "activeColumns" niz sa jos jednom kolonom
        actives.sort((a, b) => a.index - b.index); // nakon toga sortira taj niz po indexu kako bi kolone uvijek bile poredane kao sto su bile prvobitno nakon fetchanja
        setActiveColumns(actives);

        const newinactive = inactiveColumns.filter((c: Column) => c != column); // ovdje filtriramo neaktivne kolone na nacin da izbrisemo onu koju smo upravo aktivirali (zadrzavamo sve koje se razlikuju od one na koju smo kliknuli)
        setInactiveColumns(newinactive);
    }

    // ova funkcija sluzi za uklanjanje aktivnih kolona, radi na isti princip kao prethodna
    const handleRemoveColumn = (column: Column) => {
        const newactive = activeColumns.filter((c: Column) => c != column);
        setActiveColumns(newactive);
        
        setInactiveColumns([...inactiveColumns, column]);
    }

    return (
        <div className='flex flex-col flex-1 h-screen bg-gray-200'>
            <div className='flex-1 p-3 border-b-2 border-gray-400'>
                {inactiveColumns && inactiveColumns.map((inactive: Column, index: number) =>
                    <div className='sidebar-item sidebar-item__red' key={index} onDoubleClick={() => handleAddColumn(inactive)}>{inactive.naziv}</div>
                )}
            </div>
            <div className='flex-1 p-3'>
                {activeColumns && activeColumns.map((active: Column, index: number) =>
                    <div className='sidebar-item sidebar-item__green' key={index} onDoubleClick={() => handleRemoveColumn(active)}>{active.naziv}</div>
                )}
            </div>
        </div>
    )
}

export default SidebarView
