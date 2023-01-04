import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Add_To_Quntite, Remove_From_Cart } from '../../Store/ReduceSlice'

export default function Row({elem}) {
    const [Quntit,setQuntit] = useState(elem.Quantite)
    const dispatch = useDispatch()
    const change = e => {
        setQuntit(e.target.value)
        dispatch(Add_To_Quntite({Id:elem.Id,Quntit:e.target.value}))
    }
    const Delete = () => {
        dispatch(Remove_From_Cart({Id:elem.Id}))
    }
    return (
        <tr key={elem.id}>
            <td>
                <div className="table-info">
                    <main>
                        <img width="95px" src={elem.Img} />
                    </main>
                    <div>
                        <span>{elem.Name}</span>
                        <small>Size {elem.Size} / Stock {elem.Stock}</small>
                        <a onClick={Delete}>Remove</a>
                    </div>
                </div>
            </td>
            <td className='table-prix'>
                <span>${elem.Prix}</span>
            </td>
            <td className='table-Quantite'>
                <input type="number" onChange={e=>change(e)} min="1" max={elem.Stock} value={Quntit} />
            </td>
            <td className='table-total'>
                <span>${(elem.Prix * Quntit).toFixed(2)}</span>
            </td>
        </tr>
    )
}
