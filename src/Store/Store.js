import { configureStore } from "@reduxjs/toolkit";
import ProduitSlice from './ReduceSlice'

const Store = configureStore({
    reducer : {
        Produits : ProduitSlice,
    }
})

export default Store;