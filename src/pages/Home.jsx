import React from 'react';
import { SearchContext } from '../App';

import Categories from '../components/Categories';
import PizzaItem from '../components/PizzaItem';
import PizzaItemSkeleton from '../components/PizzaItemSkeleton';
import Sort from '../components/Sort';
import pizzaJson from '../pizza.json';

import style from '../scss/App.module.scss';

const Home = () => {

  const {search} = React.useContext(SearchContext)

  const pizza = [...pizzaJson]
  //const pizzaSort = pizza.sort((a.price, b.price) => a.price - b.price)
  console.log(pizza);

  const [categoryId, setCategoryId] = React.useState(0)
  const [sortType, setSortType] = React.useState('rating')


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
  

  return (
    <>
      <section className={style.main__top}>
          <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)}/>
          <Sort value={sortType} onChangeType={(n) => setSortType(n)}/>
      </section>
      <section className={style.main__menu}>
          <h2 className={style.main__menu_title}>All pizza</h2>
          <ul className={style.main__menu_list}>
            {
              pizza.filter(item => categoryId == 0 ? true : item.category == categoryId)
              .filter(item => item.name.toLowerCase().includes( search.toLowerCase()))
              .sort((a,b) => a[sortType] - b[sortType])             
              .map( item => <PizzaItem key={item.id} {...item}/>)
            }
          </ul>
      </section>
    </>
  )
}

export default Home
