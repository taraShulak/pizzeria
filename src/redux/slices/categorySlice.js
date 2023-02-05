import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  search: '',
  categoryId : 0,
  sortType: 'rating'
}

const categorySlice = createSlice({
  name : 'category',
  initialState,
  reducers : {
    setSearch(state, action) {
      state.search = action.payload
    },
    setCategoryId(state, action) {
      state.categoryId = action.payload
    },
    setSortType(state, action) {
      state.sortType = action.payload
    }
  }
})

export const {setSearch, setCategoryId, setSortType} = categorySlice.actions

export default categorySlice.reducer
/*
const initialState = {
  value: 0,
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
*/