import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "product",
  initialState: {
    categories: [],
    singleCategory: null,
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSingleCategory: (state, action) => {
      state.singleCategory = action.payload;
    },
  },
});

export const { setCategories, setSingleCategory } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
