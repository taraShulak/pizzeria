import React from 'react'
import { Link } from 'react-router-dom'
import { SearchContext } from '../App'
import style from '../scss/Header.module.scss'

const Header = () => {
  
  const {search, setSearch} = React.useContext(SearchContext)

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
          <input onChange={(event) =>  setSearch(event.target.value)} 
                 value={search}
                 placeholder='enter here'></input>
        </div>
        <div onClick={() => setSearch('')} className={style.close__icon}>
          <img src='img/close.png'  alt='close icon'/>
        </div>
      </div>
      <Link to='/cart'>
        <button className={style.header__drawer}>30 $</button>
      </Link>
    </header>
  )
}

export default Header
