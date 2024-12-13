import React, { useEffect, useState } from 'react'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { CiSearch } from "react-icons/ci";
import { ProductState } from '@/context/ProductProvider';

const Search: React.FC = () => {

    const [search, setSearch] = useState<string>('');
    const { products, setFilteredProducts } = ProductState();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value); // uzima vrijednost prilikom searchanja
    }

    const filterProducts = () => {
        const filtered = products.filter(product =>
            product.naziv.toLowerCase().includes(search.toLowerCase()) // trazi produkte po "naziv" koloni
        );
        setFilteredProducts(filtered);
    }

    useEffect(() => {

        // tajmer postavljen na jednu sekundu koji se restartuje svaki put kada se "search" state promijeni
        const timer = setTimeout(() => {
            if (search.length > 2) { // ukoliko je search duzi od 2 karaktera onda trazi produkte
                filterProducts();
            } else if (products && products.length > 0) setFilteredProducts(products); // inace kao filtrirane poruke vrati sve produkte
        }, 1000)

        return () => clearTimeout(timer);

    }, [search])

    return (
        // za search bar koristio sam ChakraUI
        <InputGroup flex="1">
            <InputLeftElement>
                <CiSearch />
            </InputLeftElement>
            <Input placeholder="Pretrazi..." onChange={handleSearch} />
        </InputGroup>
    )
}

export default Search
