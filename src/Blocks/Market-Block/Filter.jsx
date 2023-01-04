import React, { useState } from 'react'
import { Close, Drop } from '../../Icons/Icons'
import Data from "./../../Data/Data.json"

export default function FilterSection({filter,setFilter,setFilterCategorie,setPrix,Prix,ProduitAfterPrix,SetFilterSort}) {
    const [select1,setSelect1] = useState(true);
    const [select2,setSelect2] = useState(false);
    const [select3,setSelect3] = useState(false);
    const [Categorie,setCtegorie] = useState(Data.Categorie[0]);
    const [Sort,setSort] = useState(Data.Sort[0]);
    return (
        <div className={filter ? "Filter-block active" : "Filter-block"}>
            <div className="filter-main">
                <div className="filter-title">
                    <span>Filter</span>
                    <a onClick={()=>setFilter(!filter)}><Close  /></a>
                </div>
            </div>
            <div onClick={()=>setSelect3(!select3)} className={select3 ? "filter-main active" : "filter-main"}>
                <div className="select-btn">
                    <h4>
                        <Drop />
                        <b>Categorie</b>
                    </h4>
                    <span>{Categorie}</span>
                </div>
                <ul className='options'>
                    {Data.Categorie.map((elem,index) => (
                        <li key={index}>
                            <label onClick={()=>setCtegorie(elem)}>
                                <input onChange={()=>setFilterCategorie(elem)} value={elem} type="radio" name="Categorie" />
                                {elem}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={select2 ? "filter-main active" : "filter-main"}>
                <div onClick={()=>setSelect2(!select2)} className="select-btn">
                    <h4>
                        <Drop />
                        <b>Prix</b>
                    </h4>
                    <span>{Prix}$</span>
                </div>
                <ul className='options'>
                    <div>
                        <input onChange={e => setPrix(e.target.value)} type="range" min="0" max="100" step="5"/>
                        <span>{ProduitAfterPrix.length} Item left</span>
                    </div>
                </ul>
            </div>
            <div onClick={()=>setSelect1(!select1)} className={select1 ? "filter-main active" : "filter-main"}>
                <div className="select-btn">
                    <h4>
                        <Drop />
                        <b>Sort by</b>
                    </h4>
                    <span>{Sort}</span>
                </div>
                <ul className='options'>
                    {Data.Sort.map((elem,index) => (
                        <li key={index}>
                            <label onClick={()=>setSort(elem)}>
                                <input onChange={()=>SetFilterSort(elem)} value={elem} type="radio" name="name" />
                                {elem}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
