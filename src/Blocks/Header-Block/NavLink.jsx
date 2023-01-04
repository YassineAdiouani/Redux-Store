import React from 'react'
import { Cart, Home, Setting, Heart } from '../../Icons/Icons';
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function NavBar() {
    const { Produit_Cart } = useSelector(state => state.Produits);
    const Count = Produit_Cart.length>0 && <b>{Produit_Cart.length}</b>;
    return (
        <div className='navBar'>
            <ul>
                <li>
                    <NavLink to="/">
                        <Home />
                        <div className="point-Header"></div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/Cart">
                        {Count}
                        <Cart />
                        <div className="point-Header"></div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/Profile">
                        <Setting />
                        <div className="point-Header"></div>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}
