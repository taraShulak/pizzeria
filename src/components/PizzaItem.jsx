import React from 'react'
import style from '../scss/PizzaItem.module.scss'

const PizzaItem = (props) => {

  const [typeChouse, setTypeChouse] = React.useState(1)
  const [sizeChouse, setSizeChouse] = React.useState(1)
  const [isAdd, setIsAdd] = React.useState(false)
  
  const onAdd = () => {
    setIsAdd(!isAdd)
    console.log(isAdd);
  }

  const hendleChouseType = (id) => {
    setTypeChouse(id)
  }
 
  const typesPizza = ['think', 'big']

  return (
    <div className={style.list__item}>
            <div className={style.item__img}>
              <img src={props.imageUrl} alt="pizza"/>
            </div>
            <h3 className={style.item__title}>{props.name}</h3>
            <div className={style.item__options}>
              <div className={style.option__description}>
                {
                  props.types.map( item => <button onClick={()=> hendleChouseType(item)} 
                  className={`${style.option__name} ${typeChouse == item ? style.active : null}`}>{typesPizza[item]}</button>
                )}
              </div>
              <div className={style.option__size}>
                {
                  props.sizes.map((item, index) => <button 
                    onClick={() => setSizeChouse(index)}
                    className={`${style.size} ${sizeChouse == index ? style.active : null}`}>{item} sm</button>)
                }
              </div>
            </div>
            <div className={style.item__footer}>
              <div className={style.item__price}>{props.price} $</div>
              <button onClick={() => onAdd()}
              className={`${style.item__buy} ${ isAdd ? style.added : null}`}>+ add</button>
            </div>
    </div>
  )
}

export default PizzaItem
