export interface Product {
    id: number;
    klasifikacija: number,
    naziv: string;
    karakteristikaA: string | number,
    karakteristikaB: string | number,
    karakteristikaC: string | number,
    karakteristikaD: string | number,
    karakteristikaE: string | number,
}

export interface Column {
    naziv: string,
    index: number
}