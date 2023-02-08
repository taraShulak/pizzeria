import { RootState } from './../store';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type TDrawerItem = {
  id: number;
  name: string;
  size: number;
  type: string;
  imageUrl: string;
  price: number;
  count: number;
}

interface IDrawerSliceState {
  totalPrice: number;
  items: TDrawerItem[]
}

const getDrawerFromLS = () => {
  const data = localStorage.getItem('drawer')
  const itemsFromLS = data ?  JSON.parse(data) : []
  const totalPriceFromLS: number = itemsFromLS.reduce((sum: number, obj: TDrawerItem) => obj.price * obj.count + sum, 0)
  
  return {
    itemsFromLS: itemsFromLS as TDrawerItem[], 
    totalPriceFromLS
  }
}

const {itemsFromLS, totalPriceFromLS} = getDrawerFromLS()

const initialState: IDrawerSliceState = {
  totalPrice: totalPriceFromLS,
  items: itemsFromLS,
}

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<TDrawerItem>) {
      //state.items.push(action.payload)
      const findItem = state.items.find(obj => obj.id === action.payload.id && obj.size === action.payload.size && obj.type === action.payload.type)
      if (findItem) {
        findItem.count ++
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }
      //state.totalPrice += action.payload.price 
      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
    },
    minusItem(state, action: PayloadAction<TDrawerItem>) {
      const findItem = state.items.find(obj => obj.id === action.payload.id && obj.size === action.payload.size && obj.type === action.payload.type)
      if (findItem && findItem.count > 0) {
        findItem.count --
        state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
      }
    },
    removeItem(state, action: PayloadAction<TDrawerItem>) {
      const findItem = state.items.find(obj => obj.id === action.payload.id && obj.size === action.payload.size && obj.type === action.payload.type)
      state.items = state.items.filter( obj => obj !== findItem)
      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0;
    }
  }
})
export const selectDrawer = (state: RootState) => state.drawer

export const selectDrawerItem = (id: number, size: number, type: string) => (state: RootState) => state.drawer.items.find((obj) => obj.id === id && obj.size === size && obj.type === type)
//export const selectDrawerItem = (id, size, type, state) => state.drawer.items.find((obj) => obj.id === id && obj.size === size && obj.type === type)
  
export const {addItem, minusItem,removeItem, clearItems} = drawerSlice.actions

export default drawerSlice.reducer