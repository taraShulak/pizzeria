import React from 'react'
import style from './DrawerPizza.module.scss'
import { addItem, minusItem, removeItem, clearItems, selectDrawer } from '../redux/slices/drawerSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const LiPizza = (props) => {
  const dispatch = useDispatch()
  
  const onClickPlus = () => {
    const item = {
      id : props.id,
      type: props.type,
      size: props.size
    }
    dispatch(addItem(item))    
  }

  const onClickMinus = () => {
    const item = {
      id : props.id,
      type: props.type,
      size: props.size
    }
    dispatch(minusItem(item))    
  }
  const onClickRemove = () => {
    const item = {
      id : props.id,
      type: props.type,
      size: props.size
    }
    dispatch(removeItem(item))   
  }

  return (
    <li className={style.liPizza}>
          <div className={style.liPizza__main}>
            <div className={style.liPizza__img}>
              <img src={props.imageUrl} alt='image pizza'/>
            </div>
            <div className={style.liPizza__main__text}>
              <div className={style.liPizza__title}>{props.name}</div>
              <div className={style.liPizza__sort}>
                <span>{props.type}</span>
                <span>{props.size}</span>
              </div>
            </div>
          </div>
          <div className={style.liPizza__add}>
            <button onClick={onClickMinus}> - </button>
            <div className={style.liPizza__count}>{props.count}</div>
            <button onClick={onClickPlus}> + </button>
          </div>
          <div className={style.liPizza__price}> {Math.round(10*props.price * props.count)/10} $</div>
          <div className={style.liPizza__remove}>
            <button onClick={onClickRemove}> x </button>
          </div>
    </li>
  )
}

const DrawerPizza = () => {
  const dispatch = useDispatch()
  const {totalPrice, items} = useSelector(selectDrawer)  
    
  //const pizza = [...pizzaJson]
  //const pizza = false
  const onClickClear = () => {
    dispatch(clearItems())
  }

  return (
    <div className={style.drawer}>
     { items.length > 0 &&           
          <div>
            <section className={style.drawer__header}>
                <div className={style.header__left}>
                  <div className={style.header__main_icon}>
                    <img src='img/drawerMain.png'/>
                  </div>
                  <h1 className={style.header__title}>Drawer</h1>
                </div>
                <div className={style.header__right}>
                  <div onClick={onClickClear} className={style.header__clear_icon}>
                    <img src='img/drawer.svg'/>
                  </div>
                  <h1 className={style.header__right__title}>Clear the drawer</h1>
                </div>
            </section>
            <section className={style.drawer__main}>
              <ul className={style.main__list}>
                {items.map(item =>  <LiPizza key={`${item.id}${item.size}${item.type}`} {...item} />)
                }
              </ul>
              <div className={style.main__footer}>
                <div className={style.countPizza}>
                  all pizzas 
                  <span>{items.reduce((sum, obj) => sum + obj.count, 0)} pt.</span>
                </div>
                <div className={style.priceAllPizza}>
                  total price 
                  <span>{Math.round(totalPrice*10)/10} $</span>
                </div>
              </div>
            </section>
            <section className={style.drawer__footer}>
              <Link to='/'>
                <button className={style.goBack__btn}>go back</button>
              </Link>
              <button className={style.doOrder__btn}>do order</button>
            </section>
          </div>        
      }
      {items.length == 0 && 
        <div className={` ${style.drawer__empty}  ${style.de}`}>
          <h1 className={style.de__title}>Drawer is empty
          <img src="img/drawer-empty-smile.png" alt="smile" />
          </h1>
          <div className={style.de__text}>Drawer is empty, you must to add product to your drawer </div>
          <div className={style.de__img}>
            <img src='img/drawer-empty.png' alt='empty drawer'/>
          </div>
          <div className={style.de__button}>
            <Link to='/'>
              <button>go to products</button>
            </Link>
          </div>
        </div>
      }
    </div>
  )
}

export default DrawerPizza
