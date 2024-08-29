import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for products
export const fetchProduct = createAsyncThunk("Product", async()=>{
const res = await axios.get("https://dummyjson.com/products");
console.log(res);
return res.data.products;
})

// Slice for managing products and rewards
const cartSlice = createSlice({
  name: 'Slice',
  initialState:{
    items:[],
    rewards:[],
    loading:false,
    error: false,
    points:[],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    clearCart: (state, action) => {
      state.items = [];
    },
  },
  extraReducers:(builder)=>{
    builder
    .addCase(fetchProduct.pending,(state,action)=>{
      state.loading = true;
    })
    .addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
  })
  .addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
  })
  }
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
