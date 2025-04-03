import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CryptoPricesState {
    prices: Record<string, number>;
}

const initialState: CryptoPricesState = {
    prices: {},
};

const websocketSlice = createSlice({
    name: "websocket",
    initialState,
    reducers: {
        updatePrices: (state, action: PayloadAction<Record<string, number>>) => {
            state.prices = { ...state.prices, ...action.payload }
        },
    },
})

export const { updatePrices } = websocketSlice.actions
export default websocketSlice.reducer
