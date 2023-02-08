import React from 'react';
import qs from 'qs';
import useWhyDidYouUpdate  from 'ahooks/lib/useWhyDidYouUpdate';
import { useDispatch, useSelector } from 'react-redux';

import Categories from '../components/Categories';
import PizzaItem, { PizzaItemProps } from '../components/PizzaItem';
import PizzaItemSkeleton from '../components/PizzaItemSkeleton';
import Sort from '../components/Sort';
import pizzaJson from '../pizza.json';
import { EnumSortType, selectCategory, setCategoryId, setSortType, TSortType } from '../redux/slices/categorySlice';

import style from '../scss/App.module.scss';
import { useNavigate } from 'react-router-dom';
//const Header = React.lazy(() => import('../components/Header'));
import Header from '../components/Header';

const Home: React.FC = () => {
  const navigate = useNavigate()
  //const {search} = React.useContext(SearchContext)
  
  const pizza = [...pizzaJson]
     
//redux toolkit  start
  const dispatch = useDispatch()
  
  const {search, categoryId, sortType} = useSelector(selectCategory)
  
  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangeSortType = React.useCallback((sortName: EnumSortType) => {
    dispatch(setSortType(sortName))
  }, [])
//redux toolkit end

  React.useEffect(() => {
    if(window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      console.log('params', params);
    }
  })
  
  React.useEffect(() => {
    const queryString = qs.stringify({
      sortType: sortType,
      categoryId: categoryId,
      search: search
    })
    navigate(`${queryString}`)
    //console.log(queryString);
  }, [sortType, categoryId, search])
/*
  function sortPrice(a,b){
    if(a['price']>b['price'])return 1;
    if(a['price']<b['price'])return -1;
    return 0;
  }

  function sortName(a,b){
    if(a.name>b.name)return 1;
    if(a.name<b.name)return -1;
    return 0;
  }
  
  function sortRating(a,b){
    if(a.rating>b.rating)return 1;
    if(a.rating<b.rating)return -1;
    return 0;
  }
  */

  
  return (
    <>
      <Header />
      <section className={style.main__top}>
          <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
          <Sort value={sortType} onChangeType={onChangeSortType}/>
      </section>
      <section className={style.main__menu}>
          <h2 className={style.main__menu_title}>All pizza</h2>
          <ul className={style.main__menu_list}>
            { 
              pizza.filter(item => categoryId == 0 ? true : item.category == categoryId)
              .filter(item => item.name.toLowerCase().includes( search.toLowerCase()))              
              .sort((a: any ,b: any ) => a[sortType] - b[sortType])                            
              .map( item => <PizzaItem key={item.id} {...item}/>)
            }
          </ul>
      </section>
    </>
  )
}

export default Home
