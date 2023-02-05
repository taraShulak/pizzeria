import React from 'react'
import { Routes, Route} from "react-router-dom";

import Header from './components/Header';
import style from './scss/App.module.scss';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import DrawerPizza from './pages/DrawerPizza';



function App() {
  
//then we use mockApi server for our data
/* 

const dispatch = useDispatch()
const pizza = useSelector(state => state.pizza.items)
const [isLoading, setIsLoading]= React.useState(true)

React.useEffect(() => {
  fetch('mockapi url')
  .then((res) => res.json)
  .then((arr) => {
    setPizzaData(arr);
    setIsLoading(false)
  })
}, [])

or use axios 
React.useEffect(() => {
  axios
     .get(mockApi url)
     .then( (res) => {
      setPizzaData(res.data)
      setIsLoading(false)
    })
  },[])

  or use axios reduxToolkit with async/ await with try/catch/finally

  React.useEffect(async () => {    
    try{
        const res = await axios.get(mockApi url)  // or  const { data } = await axios.get(mockApi url)   
        dispatch(setItems(res.data))     // or           dispatch( setItems( data ))
    } catch (error) {
        alert(error)
    } finally {
      setIsLoading(false)
    } 
  }, []) 


*/


  return (
    <div className={style.wrapper}>
        <Header />
        <main className={style.main}>
          <Routes>
            <Route path='/*' element={<Home  />}/>
            <Route path='/cart' element={<DrawerPizza/>}/>
            {/*<Route path='*' element={<NotFound/>} />*/}
          </Routes>        
        </main>      
    </div>
  );
}

export default App;
