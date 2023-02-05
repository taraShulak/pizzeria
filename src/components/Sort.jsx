import React from 'react';
import style from '../scss/Sort.module.scss';

const listOption = ['name', 'price', 'rating']

const Sort = ({value, onChangeType}) => {
  
  const sortRef = React.useRef()
  const [isList, setIsList] = React.useState(false)
  const [listName, setListName] = React.useState(listOption[0])

  const hendleListName = (index) => {
    setIsList(false)
    //setListName( listOption[ index])
    onChangeType( listOption[index])
  }
// when onClick outside Sort ....div sortList deleted or hidden
  React.useEffect(() => {
   
      const hendleClickSort = (event ) => {
       // console.log(event.composedPath()) 
        const path = event.composedPath().includes(sortRef.current)
        if(!path) {
          setIsList(false)
        }
      }    
      document.body.addEventListener('click', hendleClickSort)
      return () => { document.body.removeEventListener('click', hendleClickSort)}
    
  }, [])
//===========
  return (
    <div ref={sortRef} className={style.sort}>
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
