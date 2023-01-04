import React, { useState } from 'react'
import Product from './Product';
import FilterSection from './Filter';
import Data from "./../../Data/Data.json"
import { useDispatch, useSelector } from 'react-redux';
import { DarkHeart, Filter, Heart, Search } from "../../Icons/Icons"
import { Add_To_SelectedProduit } from '../../Store/ReduceSlice';

export default function Market() {
    const { Produits } = useSelector(state => state.Produits)
    const [filter,setFilter] = useState(false)
    const [Searchh,setSearch] = useState('')
    const [Prix,setPrix] = useState(Data.MaxPrix)
    const [FilterCategorie,setFilterCategorie] = useState(Data.Categorie[0])
    const prods = FilterCategorie === Data.Categorie[0] ? Produits.filter(elem => elem.Categorie !== FilterCategorie)
    :Produits.filter(elem => elem.Categorie === FilterCategorie)
    const [FilterSort,SetFilterSort] = useState(Data.Sort[0])
    const prodsort0 = FilterSort !== Data.Sort[1] ? 
        prods:
        prods.sort((first,last) => first.Prix - last.Prix)
    const prodsort = FilterSort !== Data.Sort[2] ? 
        prodsort0:
        prodsort0.filter(elem => elem.Favorite);
    const produitAfterSearch = prodsort.filter(elem => elem.Name.toLowerCase().includes(Searchh.toLowerCase()))
    const ProduitAfterPrix = produitAfterSearch.filter(elem => elem.Prix < Prix);
    const [active,setActive] = useState(true)
    const dispatch = useDispatch()
    function SelectedOne (obj){
        setActive(!active)
        dispatch(Add_To_SelectedProduit({obj}))
    }
    return (
        <section className="Market-section">
            <div className="Search-block">
                <span onClick={()=>setFilter(!filter)}><Filter /></span>
                <div className='input-Search'>
                    <Search />
                    <input type="text" onChange={e => setSearch(e.target.value)} placeholder='Search for Items...'/>
                </div>
            </div>
            <div className="market-block">
                <FilterSection
                    SetFilterSort={SetFilterSort}
                    ProduitAfterPrix={ProduitAfterPrix}
                    Prix={Prix}
                    setPrix={setPrix}
                    setFilterCategorie={setFilterCategorie} 
                    setFilter={setFilter} filter={filter}
                />
                <div className="cards-Container">
                    {ProduitAfterPrix.map((elem,index) => (
                        <div onClick={()=>SelectedOne(elem)} className={elem.Favorite ? "card active" : "card"} key={index}>
                            <a className='Favorite-btn'>{elem.Favorite && <DarkHeart />}</a>
                            <div>
                                <img src={elem.Img} alt="Produit-img" />
                            </div>
                            <span>{elem.Name}</span>
                            <small>${elem.Prix} USD</small>
                        </div>
                    ))}
                </div>
            </div>
            <Product setActive={setActive} active={active}/>
        </section>
    )
}
