import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalAmount += Number(action.payload.price);
    },
    removeFromCart: (state, action) => {
      const item = state.items.find((cartItem) => cartItem.id === action.payload);

      if (!item) return;

      state.totalQuantity -= item.quantity;
      state.totalAmount -= item.quantity * Number(item.price);
      state.items = state.items.filter((cartItem) => cartItem.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((cartItem) => cartItem.id === id);

      if (!item) return;

      const difference = quantity - item.quantity;
      item.quantity = quantity;
      state.totalQuantity += difference;
      state.totalAmount += difference * Number(item.price);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
