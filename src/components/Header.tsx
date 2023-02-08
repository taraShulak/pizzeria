import React, {useState} from 'react'
import debounce from 'lodash.debounce'
import useWhyDidYouUpdate  from 'ahooks/lib/useWhyDidYouUpdate';

import { Link } from 'react-router-dom'
import style from '../scss/Header.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setSearch } from '../redux/slices/categorySlice'
import { addItem, selectDrawer } from '../redux/slices/drawerSlice'

type LiPizzaProps = {
  id: number;
  name: string;
  size: number;
  type: string;
  imageUrl: string;
  rating?: number;
  category?: number;
  price: number;
  count: number;
}

const Header: React.FC = React.memo(() => {
  
  console.log('rerender header');

  const dispatch = useDispatch()
  const {totalPrice, items} = useSelector(selectDrawer)
  const totalCount = items.reduce((sum: number, obj: LiPizzaProps) => sum + obj.count, 0)
  const [current, setCurrent] = React.useState('')

  const isMounted = React.useRef(false)
    
  console.log(isMounted.current);
  
  React.useEffect(() => {
    if(isMounted.current){
      const json = JSON.stringify(items)
      localStorage.setItem('drawer', json)
      console.log(json);      
    }

    isMounted.current = true;
  }, [items])
  
  const inputRef = React.useRef<HTMLInputElement>(null)

  const updateSearch = React.useCallback(
    debounce((str) => {
      dispatch( setSearch(str))
    }, 1000),
    []
  )  

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrent(event.target.value)
    updateSearch(event.target.value)
  }
    
  const onClickClose = () => {
    dispatch ( setSearch('') )
    setCurrent('')
    //if (inputRef.current){
    //  inputRef.current.focus()
    //}
//====== but we can code short ----- is 
    inputRef.current ?.focus()
  }

   return (
    <header className={style.header}>
      <Link to='/'>
        <div className={style.header__left}>
          <div className={style.header__img}>
            <img src="img/header__logo.png" alt="header logo"/>
          </div>
          <div className={style.header__content}>
            <h1 className={style.header__title}>The Best Pizza</h1>
            <p className={style.header__text}>A Very tasty pizza</p>
          </div>
        </div>
      </Link>
      { window.location.pathname !== '/cart' && 
        (<div className={style.search}>
        <div className={style.search__icon}>
          <img src='img/search.png'  alt='search icon'/>
        </div>
        <div className={style.search__input}>
          <input 
                 ref={inputRef}
                 onChange={(event) =>  onChangeInput(event)} 
                 value={current}
                 placeholder='enter here'>

          </input>
        </div>
        { current && 
          <div onClick={onClickClose} className={style.close__icon}>
            <img src='img/close.png'  alt='close icon'/>
          </div>
        }
        </div>)
      }
      <Link to='/cart'>
        <button className={style.header__drawer}>{Math.round(totalPrice * 10) / 10} $ | {totalCount} pt</button>
      </Link>
    </header>
  )
})

export default Header
