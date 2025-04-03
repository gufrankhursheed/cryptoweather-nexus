import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Crypto {
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    price_change_percentage_24h: number;
  }

interface CryptoState {
    data: Crypto[];
    status: string;
    error: string | null;
}

const initialState: CryptoState = {
    data: [],
    status: "idle",
    error: null,
};

export const fetchCrypto = createAsyncThunk("crypto/fetch", async () => {
    const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,dogecoin"
    )

    if (!res.ok) {
        throw new Error("Failed to fetch cryptocurrency data");
    }

    return res.json();
})

const cryptoSlice = createSlice({
    name: "crypto",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCrypto.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchCrypto.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.data = action.payload
            })
            .addCase(fetchCrypto.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message ?? "Something went wrong"
            });
    },
})

export default cryptoSlice.reducer

