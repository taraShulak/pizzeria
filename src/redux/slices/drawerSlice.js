import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  totalPrice: 0,
  items: []
}

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    addItem(state, action) {
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
    minusItem(state, action) {
      const findItem = state.items.find(obj => obj.id === action.payload.id && obj.size === action.payload.size && obj.type === action.payload.type)
      if (findItem.count > 0) {
        findItem.count --
        state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
      }
    },
    removeItem(state, action) {
      const findItem = state.items.find(obj => obj.id === action.payload.id && obj.size === action.payload.size && obj.type === action.payload.type)
      state.items = state.items.filter( obj => obj !== findItem)
      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
    },
    clearItems(state, action) {
      state.items = []
      state.totalPrice = 0;
    }
  }
})
export const selectDrawer = (state) => state.drawer

export const selectDrawerItem = (id, size, type) => (state) => state.drawer.items.find((obj) => obj.id === id && obj.size === size && obj.type === type)
//export const selectDrawerItem = (id, size, type, state) => state.drawer.items.find((obj) => obj.id === id && obj.size === size && obj.type === type)
  
export const {addItem, minusItem,removeItem, clearItems} = drawerSlice.actions

export default drawerSlice.reducer