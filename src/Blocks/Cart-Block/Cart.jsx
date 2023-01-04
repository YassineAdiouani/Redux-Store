import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Error, MasterCard, Paypal, Verify, Visa } from '../../Icons/Icons'
import { Buy_Produit_From_Cart } from '../../Store/ReduceSlice'
import Row from './Row'
import { Link } from 'react-router-dom'

export default function Cart() {
    const [notifi,setnotifi] = useState(true)
    const [Active,setActive] = useState(false)
    const dispatch = useDispatch()
    const { Produit_Cart } = useSelector(state => state.Produits)
    const total = Produit_Cart.reduce(
        (tot, elem) => tot + (elem.Prix * elem.Quantite), 0
    );
    const CheckOut = () => {
        if(Produit_Cart.length===0){
            setnotifi(!notifi)
        }
        setActive(!Active)
        let timer = setTimeout(()=>{
            setActive(false)
        },2500)
        dispatch(Buy_Produit_From_Cart())
    }
    return (
        <>
            <section className="Cart-Section">
                {notifi ?
                <div className={Active ? "notification active" : "notification"}>
                    <span><Verify /></span>
                    <p>Produit Add successfull !!!</p>
                </div>:
                <div className={Active ? "notification active" : "notification"}>
                    <span><Error /></span>
                    <p>Add Items to Cart First !!!</p>
                </div>
                }
                <div className="Cart-container">
                    <div className="Cart-title">
                        <h1>Your Cart</h1>
                        <Link to="/">Continue shopping</Link>
                    </div>
                    <div>
                        {Produit_Cart.length>0?
                        <table>
                            <thead>
                                <tr>
                                    <th>PRODUCT</th>
                                    <th>PRICE</th>
                                    <th>QUANTITY</th>
                                    <th>TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Produit_Cart.map((elem,i) => (
                                    <Row key={i} elem={elem} />
                                ))}
                            </tbody>
                        </table>:
                        <div className='Empty-table'>The cart is empty</div>
                        }
                    </div>
                    <div className="Paymient-Block">
                        <div className='prix-total'>
                            <span><a>Subtotal</a></span>
                            <span>${total.toFixed(2)} USD</span>
                        </div>
                        <div>
                            <small>Taxes and <a>shipping</a> calculated at checkout</small>
                        </div>
                        <button onClick={CheckOut}>CHECK OUT</button>
                        <ul>
                            <li><Visa /></li>
                            <li><Paypal /></li>
                            <li><MasterCard /></li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}
