import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Close, DarkHeart, Heart } from '../../Icons/Icons'
import { Add_To_Cart, Add_To_Favorite, Add_To_Quntite } from '../../Store/ReduceSlice'

export default function Product({active,setActive}) {
    const { selected_Produit } = useSelector(state => state.Produits)
    const { Produit_Cart } = useSelector(state => state.Produits)
    const {Id, Name, Prix, Categorie, Order,Img, Stock,Favorite} = selected_Produit
    const [Quntit,setQuntit] = useState(1);
    const dispatch = useDispatch()
    const { Select } = document.forms[0] || ""
    function AddToCart(){
        let wesh = true
        Produit_Cart.map(elem => {
            if(elem.Id === selected_Produit.Id){
                console.log(typeof Quntit);
                // console.log(typeof elem.Quantite);
                dispatch(Add_To_Quntite(
                    {Id:selected_Produit.Id,Quntit:(parseInt(Quntit)+parseInt(elem.Quantite))}
                ))
                wesh = !wesh
            }
        })
        if(wesh){
            const produit = {...selected_Produit}
            produit.Size = Select.value
            produit.Quantite = Quntit
            dispatch(Add_To_Cart({produit}))
        }
        setActive(!active)
    }
    function favorite(){
        dispatch(Add_To_Favorite({Id : selected_Produit.Id}))
    }
    return (
        <div className={active ? "Produit-Section" : "Produit-Section active"}>
            <div className="the-one">
                <div onClick={()=>setActive(!active)} className="close-produit">
                    <Close />
                </div>
                <div className="img-produit-one">                                
                    <img src={Img} alt="produit-one" />
                </div>
                <div className="produit-daity">
                    <div className="one one-daity">
                        <span>{Name}</span>
                        <b>${Prix} USD</b>
                        <small>{Stock <= 0 ? 0 :Stock} On Stock / {Order} Order</small>
                        <a onClick={favorite}>Add to Favorite {Favorite ? <DarkHeart /> : <Heart />}</a>
                    </div>
                    <div className="one one-cart">
                        <div>
                            <span><a>Shipping</a> calculated at checkout.</span>
                            <form className='form-produit'>
                                <span className='back'>
                                    <label>Size</label>
                                    <select name='Select'>
                                        <option value="3-6m">3-6m</option>
                                        <option value="6-12m">6-12m</option>
                                        <option value="12-18m">12-18m</option>
                                    </select>
                                </span>
                                <span className='back Input-Quntit'>
                                    <label>Quntite</label>
                                    <input onChange={e=>setQuntit(e.target.value)} value={Quntit} name='Quntite' type="number" min="1" max={Stock} />
                                </span>
                            </form>
                        </div>
                        <div className='method-prod'>
                            {selected_Produit.Stock>0
                        ?
                            <button onClick={AddToCart}>ADD TO CART</button>
                        :
                            <button disabled style={{color:"red",border:'1px solid red'}}>out of Stock</button>
                            }
                            <small>More payment options</small>
                        </div>
                    </div>
                    <div className="one discription">
                        <p>Do you love New York? Do you live in New York? Both?? Either way this stylish romper works ; Our signature organic cotton fabric is buttery soft, stretchy and non-toxic, ideal to put n little human's sensitive skin.
                            Hand-printed in our New York studio with love. Grab the matching hat to complete the outfit. <br />
                            ・ <br />
                            ・ <br />
                            100% GOTS certified organic cotton
                            Machine wash cold, tumble dry low</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
