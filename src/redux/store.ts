import { configureStore } from "@reduxjs/toolkit";
import category from './slices/categorySlice';
import drawer from "./slices/drawerSlice";
import pizza from "./slices/pizzaMainSlice";

export const store = configureStore({
  reducer : {
    category,
    drawer,
    pizza
  }
})

export type RootState = ReturnType<typeof store.getState>

/*import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})
*/
