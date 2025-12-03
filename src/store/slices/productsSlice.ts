import Product from "@/types/productsType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[] | null>) => {
      state.products = action.payload || [];
    },
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
