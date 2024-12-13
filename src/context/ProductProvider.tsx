import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { Product, Column } from "../models/models"
import axios from "axios";

// dodajemo interface za context vrijednosti koje cemo koristiti u ostalim komponentama
interface ProductContextType {
    products: Product[],
    setProducts: (products: Product[]) => void,
    filteredProducts: Product[],
    setFilteredProducts: (products: Product[]) => void,
    columns: Column[],
    activeColumns: Column[],
    setActiveColumns: (columns: Column[]) => void,
    inactiveColumns: Column[],
    setInactiveColumns: (columns: Column[]) => void,
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
    children: ReactNode;
}

const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {

    // product states
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    // column states
    const [columns, setColumns] = useState<Column[]>([]);
    const [activeColumns, setActiveColumns] = useState<Column[]>([]);
    const [inactiveColumns, setInactiveColumns] = useState<Column[]>([]);

    // asinhrona funkcija koja se poziva prilikom otvaranja programa i sluzi samo za fetchanje produkata
    const fetchAllProducts = async () => {
        try {
            const { data } = await axios.get("/api/sifre");
            setProducts(data);
            setFilteredProducts(data);
        } catch (e) {
            console.log(e);
        }
    }

    // funkcija koja se takodjer poziva samo jednom na pocetku i sluzi za fetchanje i organizovanje kolona
    const fetchAllColumns = async () => {
        try {
            const { data } = await axios.get("/api/kolone"); // dobavlja kolone sa apija

            const cols: Column[] = data.map((co: string, index: number) => { return { "naziv": co, "index": index } }); // dodjeljuje svakom elementu index kako bi se kasnije kolone mogle sortirati (npr. da id uvijek bude prva kolona)
            setColumns(cols);

            // svaki put kada se program otvori odabere se prvih 5 kolona za prikaz (id, klasifikacija, naziv, karakteristikaA, karakteristikaB), a ostale bivaju u sidebaru kao opcija za prikazivanje
            const active = cols.filter((_c: Column, index: number) => index < 5);
            setActiveColumns(active);

            // u neaktivne smijestamo preostale kolone (index veci od 4)
            const inactive = cols.filter((_c: Column, index: number) => index >= 5);
            setInactiveColumns(inactive);
        } catch (e) {
            console.log(e);
        }
    }

    // hook koji se pokrece samo jednom na pocetku programa i poziva dvije prethodne funkcije
    useEffect(() => {
        fetchAllProducts();
        fetchAllColumns();
    }, [])

    return (
        <ProductContext.Provider value={
            {
                products: products,
                setProducts: setProducts,
                filteredProducts: filteredProducts,
                setFilteredProducts: setFilteredProducts,
                columns: columns,
                activeColumns: activeColumns,
                setActiveColumns: setActiveColumns,
                inactiveColumns: inactiveColumns,
                setInactiveColumns: setInactiveColumns,
            }
        }>
            {children}
        </ProductContext.Provider>
    );
};

// hook koji omogucava lakse koristenje contexta
export const ProductState = (): ProductContextType => {
    const context = useContext(ProductContext);

    if (!context) {
        throw new Error("Potreban ProductProvider");
    }

    return context;
};

export default ProductProvider;
