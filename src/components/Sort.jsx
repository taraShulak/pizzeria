import React from 'react';
import style from '../scss/Sort.module.scss';

const Sort = ({value, onChangeType}) => {

  const listOption = ['name', 'price', 'rating']
  const [isList, setIsList] = React.useState(false)
  const [listName, setListName] = React.useState(listOption[0])

  const hendleListName = (index) => {
    setIsList(false)
    //setListName( listOption[ index])
    onChangeType( listOption[index])
  }

  return (
    <div className={style.sort}>
      <div className={style.sort__title}>
        sort by : 
        <span onClick={()=> setIsList(!isList)}>{value}</span>
      </div>
      {isList && 
          <ul className={style.sort__list}>
            {listOption.map( (item, index) => <li onClick={()=> hendleListName(index)}> {item} </li>)}
          </ul>
      }
    </div>
  )
}

export default Sort
