import React from 'react'
import style from '../scss/Categories.module.scss'



/*const ButtonCategorie = () => {
  
  const [isChose, setIsChose] = React.useState(false)

  const onChose = () => {
    setIsChose(!isChose)
  }
  
  return (
    <button onClick={onChose} 
            className={`${style.categories__item} 
                ${isChose ? style.active : null}`}> chees
    </button>
  )
}
*/
const Categories = ({value, onChangeCategory}) => {

  const categories = ['all', 'chease', 'meat', 'margarita', 'vegan','vegeterian']
 
  return (
    <div className={style.categories}>
          <ul className={style.categories__list}>
           {
            categories.map((item, index) => 
            <li 
              key={index}
              onClick={() => onChangeCategory(index)} 
              className={`${style.categories__item} ${value == index ? style.active : null}`}>
                  {item}
            </li>
           )}             
          </ul>
    </div>
  )
}

export default Categories
