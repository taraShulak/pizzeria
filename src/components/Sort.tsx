import React from 'react';
import { EnumSortType } from '../redux/slices/categorySlice';
import style from '../scss/Sort.module.scss';

const listOption = [EnumSortType.PRICEUP, EnumSortType.RATING, EnumSortType.NAME]

type SortProps = {
  value: string;
  onChangeType: (str: EnumSortType) => void;
}

const Sort: React.FC <SortProps> = React.memo(({value, onChangeType}) => { 
  
  const sortRef = React.useRef<HTMLDivElement>(null)
  const [isList, setIsList] = React.useState(false)
  const [listName, setListName] = React.useState<string>(listOption[0])

  const hendleListName = (index: number) => {
    setIsList(false)
    //setListName( listOption[ index])
    onChangeType( listOption[index])
  }
// when onClick outside Sort ....div sortList deleted or hidden
  React.useEffect(() => {
   
      const hendleClickSort = (event: any ) => {
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
            {listOption.map( (item, index) => <li 
                    key={index}
                    onClick={()=> hendleListName(index)}> {item} </li>)}
          </ul>
      }
    </div>
  )
})

export default Sort
