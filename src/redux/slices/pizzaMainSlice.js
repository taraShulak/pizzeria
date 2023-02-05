import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  items: []
}

const pizzaMainSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload      
    }
  }
})

export const {setItems} = pizzaMainSlice.actions

export default pizzaMainSlice.reducer