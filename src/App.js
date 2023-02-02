import React from 'react'
import { Routes, Route} from "react-router-dom";

import Header from './components/Header';
import style from './scss/App.module.scss';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import CartPizza from './pages/CartPizza';

export const SearchContext = React.createContext()

function App() {

//then we use mockApi server for our data
/* 
const [pizzaData, setPizzaData] = React.useState([])
const [isLoading, setIsLoading]= React.useState(true)

React.useEffect(() => {
  fetch('mockapi')
  .then((res) => res.json)
  .then((arr) => {
    setPizzaData(arr);
    setIsLoading(false)
  })
}, [])
*/

const [search, setSearch] = React.useState('')

const onChangeSearch = (event) => {
  setSearch(event.target.value)
}

const clearSearch = () => {
  setSearch('')
}

  return (
    <div className={style.wrapper}>
      <SearchContext.Provider value={{search, setSearch}}>
        <Header />
        <main className={style.main}>
          <Routes>
            <Route path='/' element={<Home  />}/>
            <Route path='/cart' element={<CartPizza/>}/>
            <Route path='*' element={<NotFound/>} />
          </Routes>        
        </main>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
