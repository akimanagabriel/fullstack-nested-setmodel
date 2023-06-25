import { configureStore } from "@reduxjs/toolkit";
import { categoryReducer } from "./productSlice";

const store = configureStore({
  reducer: { categories: categoryReducer },
});

export default store;
