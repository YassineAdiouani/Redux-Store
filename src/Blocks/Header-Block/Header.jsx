import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars, Close, Search } from '../../Icons/Icons';
import NavBar from './NavLink';


export default function Header() {
    const [active , setActive] = useState(false)
    return (
        <header>
            <a onClick={()=>setActive(!active)}>{<Bars />}</a>
            <Link className='Logo' to="/">KidsShop</Link>
            <ul className={active ? "Links active" : "Links"}>
                <a onClick={()=>setActive(!active)}>{<Close />}</a>
                <li><Link to="/">Shop</Link></li>
                <li><Link to="/Cart">Cart</Link></li>
                <li><Link to="/Profile">Profile</Link></li>
            </ul>
            <NavBar />
        </header>
    )
}
