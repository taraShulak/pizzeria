import { RootState } from './../store';
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'

export type TSortType =  'price' | 'rating' | 'name' | string;
export enum  EnumSortType { 
  PRICEUP = 'price',
  RATING =  'rating',
  NAME = 'name'
};

type TInitialState = {
  search: string;
  categoryId: number;
  sortType: EnumSortType;
}

const initialState: TInitialState = {
  search: '',
  categoryId : 0,
  sortType: EnumSortType.RATING
}

const categorySlice = createSlice({
  name : 'category',
  initialState,
  reducers : {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSortType(state, action:PayloadAction<EnumSortType>) {
      state.sortType = action.payload
    }
  }
})

export const selectCategory = (state: RootState) => state.category

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