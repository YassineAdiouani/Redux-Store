import { createSlice } from '@reduxjs/toolkit'
import Data from '../Data/Data.json';

const produit = localStorage.getItem(Data.storageKey) !== null ? JSON.parse
(localStorage.getItem(Data.storageKey)) : [...Data.Produits]
const produitCart = localStorage.getItem(Data.produitCart) !== null ? JSON.parse
(localStorage.getItem(Data.produitCart)) : []

const initialState = {
    Produits : produit,
    Produit_Cart : produitCart,
    selected_Produit : ''
}

const ProduitSlice = createSlice({
    name : "Produits",
    initialState,
    reducers : {
        Add_To_Cart(state,action){
            state.Produit_Cart = [...state.Produit_Cart,action.payload.produit]
            localStorage.setItem(Data.produitCart,JSON.stringify(state.Produit_Cart.map(one => one)))
        },
        Add_To_SelectedProduit(state,action){
            state.selected_Produit = action.payload.obj;
        },
        Add_To_Quntite(state,action){
            state.Produit_Cart.map(elem => {
                if(elem.Id === action.payload.Id) elem.Quantite = action.payload.Quntit
                return elem
            })
            localStorage.setItem(Data.produitCart,JSON.stringify(state.Produit_Cart.map(one => one)))
        },
        Remove_From_Cart(state,action){
            const filter = state.Produit_Cart.filter(elem => elem.Id !== action.payload.Id)
            state.Produit_Cart = [...filter]
            localStorage.setItem(Data.produitCart,JSON.stringify(state.Produit_Cart.map(one => one)))
        },
        Buy_Produit_From_Cart(state){
            state.Produits.map(elem => {
                state.Produit_Cart.map(tani => {
                    if(elem.Id === tani.Id){
                        elem.Stock = elem.Stock - tani.Quantite
                        elem.Order = elem.Order + 1
                    }
                    return elem
                })
            })
            state.Produit_Cart = []
            localStorage.setItem(Data.produitCart,JSON.stringify(state.Produit_Cart.map(one => one)))
            localStorage.setItem(Data.storageKey,JSON.stringify(state.Produits.map(one => one)))
        },
        Add_To_Favorite(state,action){
            state.Produits.map(elem => {
                if(elem.Id === action.payload.Id){
                    elem.Favorite = !elem.Favorite
                    state.selected_Produit = elem
                    return elem
                } 
                return elem
            })
            localStorage.setItem(Data.storageKey,JSON.stringify(state.Produits.map(one => one)))
        }
    }
})

export const { Add_To_Cart, Add_To_SelectedProduit, Add_To_Quntite, Remove_From_Cart, Buy_Produit_From_Cart,Add_To_Favorite } = ProduitSlice.actions
export default ProduitSlice.reducer