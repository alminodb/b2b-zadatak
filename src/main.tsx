import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import 'devextreme/dist/css/dx.light.css';
import ProductProvider from './context/ProductProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <ChakraProvider>
        <ProductProvider>
            <App />
        </ProductProvider>
    </ChakraProvider>,
)
