import React, {useState} from 'react'
import debounce from 'lodash.debounce'

import { Link } from 'react-router-dom'
import { SearchContext } from '../App'
import style from '../scss/Header.module.scss'
import { useSelector } from 'react-redux'


const Header = () => {

  const {totalPrice, items} = useSelector(state => state.drawer)
  const totalCount = items.reduce((sum, obj) => sum + obj.count, 0)
  const [current, setCurrent] = React.useState('')

  const {setSearch} = React.useContext(SearchContext);

  const inputRef = React.useRef()

  const updateSearch = React.useCallback(
    debounce((str) => {
      setSearch(str)
    }, 1000),
    []
  )  

  const onChangeInput = (str) => {
    setCurrent(str)
    updateSearch(str)
  }
    
  const onClickClose = () => {
    setSearch('') 
    setCurrent('')
    inputRef.current.focus()
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
      <div className={style.search}>
        <div className={style.search__icon}>
          <img src='img/search.png'  alt='search icon'/>
        </div>
        <div className={style.search__input}>
          <input 
                 ref={inputRef}
                 onChange={(event) =>  onChangeInput(event.target.value)} 
                 value={current}
                 placeholder='enter here'></input>
        </div>
        { current && 
          <div onClick={onClickClose} className={style.close__icon}>
            <img src='img/close.png'  alt='close icon'/>
          </div>
        }
      </div>
      <Link to='/cart'>
        <button className={style.header__drawer}>{Math.round(totalPrice * 10) / 10} $ | {totalCount} pt</button>
      </Link>
    </header>
  )
}

export default Header
