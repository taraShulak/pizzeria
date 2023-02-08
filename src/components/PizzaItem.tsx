import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, selectDrawerItem, TDrawerItem } from '../redux/slices/drawerSlice'
import style from '../scss/PizzaItem.module.scss'

export type PizzaItemProps = {
  id: number;
  name: string;
  sizes: number[];
  types: number [];
  imageUrl: string;
  rating: number;
  category: number;
  price: number;
}

const PizzaItem: React.FC <PizzaItemProps> = (props) => {
  const typesPizza = ['thin', 'thick']
  const dispatch = useDispatch()
 
  const [typeChouse, setTypeChouse] = React.useState(0)
  const [sizeChouse, setSizeChouse] = React.useState(0)
  const [pricePizza, setPricePizza] = React.useState(props.price)
   
  const drawerItem = useSelector(selectDrawerItem(props.id, props.sizes[sizeChouse], typesPizza[typeChouse]))
  //const drawerItem = useSelector(state => selectDrawerItem(props.id, props.sizes[sizeChouse], typesPizza[typeChouse], state))
  //console.log(drawerItem, ' count');

  const addedCount = drawerItem ? drawerItem.count : 0

  const hendleChouseSize = (size: number, index: number) => {
    setSizeChouse(index)
    const pPrice = props.price + props.price * (size - 25) * 0.025 + (props.price * 0.3 * typeChouse) 
    setPricePizza(Math.round(pPrice *10) / 10)
    //setPricePizza(() => props.price + props.price * (size - 25) * 0.025 + (props.price * 0.3 * typeChouse) )
  }

  const hendleChouseType = (id: number) => {
    setTypeChouse(id)
    let size = props.sizes[sizeChouse]
    const pPrice =  props.price + props.price * 0.3 * id + props.price * (size - 25) * 0.025
    setPricePizza(Math.round(pPrice*10) / 10)
    //setPricePizza(() => props.price + props.price * 0.3 * id + props.price * (size - 25) * 0.025) 
  }
 
  

  const onClickAdd = () => {
    const item: TDrawerItem= {
      id : props.id,
      name : props.name,
      price: pricePizza,
      imageUrl : props.imageUrl,
      type: typesPizza[typeChouse],
      size: props.sizes[sizeChouse], 
      count: 0
    }
    dispatch(addItem(item))    
  }

  return (
    <div className={style.list__item}>
            <div className={style.item__img}>
              <img src={props.imageUrl} alt="pizza"/>
            </div>
            <h3 className={style.item__title}>{props.name}</h3>
            <div className={style.item__options}>
              <div className={style.option__description}>
                {
                  props.types.map( (item, index) => <button 
                    key={index}
                    onClick={()=> hendleChouseType(item)} 
                    className={`${style.option__name} ${typeChouse == item ? style.active : null}`}>{typesPizza[item]}</button>
                )}
              </div>
              <div className={style.option__size}>
                {
                  props.sizes.map((item, index) => <button 
                    key={index}  
                    onClick={() => hendleChouseSize(item, index)}
                    className={`${style.size} ${sizeChouse == index ? style.active : null}`}>{item} sm</button>)
                }
              </div>
            </div>
            <div className={style.item__footer}>
              <div className={style.item__price}>{pricePizza} $</div>
              <button onClick={onClickAdd} className={style.item__buy}>
                add
                {addedCount > 0 && <span>{addedCount}</span>}
               </button>
            </div>
    </div>
  )
}

export default PizzaItem
