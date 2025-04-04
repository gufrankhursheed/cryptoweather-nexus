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

export interface HistoricalData {
    date: string;
    price: number;
}

export interface CryptoDetail {
    id: string;
    name: string;
    symbol: string;
    image: { large: string };
    market_cap_rank: number;
    market_data: {
        current_price: { usd: number };
        market_cap: { usd: number };
        price_change_percentage_24h: number;
        high_24h: { usd: number };
        low_24h: { usd: number };
        ath: { usd: number };
        ath_date: string;
        circulating_supply: number;
        total_supply: number;
    };
}

interface CryptoState {
    data: Crypto[];
    cryptoDetail: CryptoDetail | null;
    historicalData: HistoricalData[];
    status: string;
    detailStatus: string;
    historyStatus: string;
    error: string | null;
}

const initialState: CryptoState = {
    data: [],
    cryptoDetail: null,
    historicalData: [],
    status: "idle",
    detailStatus: "idle",
    historyStatus: "idle",
    error: null,
};

const API_KEY = process.env.NEXT_PUBLIC_CRYPTO_API_KEY

export const fetchCrypto = createAsyncThunk("crypto/fetch", async () => {
    const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,dogecoin&x_cg_api_key=${API_KEY}`
    )

    if (!res.ok) {
        throw new Error("Failed to fetch cryptocurrency data");
    }

    return res.json();
})

export const fetchCryptoDetail = createAsyncThunk(
    "crypto/fetchDetail",
    async (id: string) => {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}?x_cg_api_key=${API_KEY}`);

        if (!res.ok) {
            throw new Error("Failed to fetch cryptocurrency details");
        }

        return res.json();
    }
);

export const fetchCryptoHistory = createAsyncThunk(
    "crypto/fetchHistory",
    async (id: string) => {
        const res = await fetch(
             `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&x_cg_api_key=${API_KEY}`
        );

        if (!res.ok) {
            throw new Error("Failed to fetch historical data");
        }

        const data = await res.json();
        return data.prices.map((price: number[]) => ({
            date: new Date(price[0]).toLocaleDateString(),
            price: price[1],
        }));
    }
);

const cryptoSlice = createSlice({
    name: "crypto",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCrypto.pending, (state) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(fetchCrypto.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.data = action.payload
            })
            .addCase(fetchCrypto.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message ?? "Something went wrong"
            })
            .addCase(fetchCryptoDetail.pending, (state) => {
                state.detailStatus = "loading"
                state.error = null
            })
            .addCase(fetchCryptoDetail.fulfilled, (state, action) => {
                state.detailStatus = "succeeded"
                state.cryptoDetail = action.payload
            })
            .addCase(fetchCryptoDetail.rejected, (state, action) => {
                state.detailStatus = "failed"
                state.error = action.error.message ?? "Something went wrong"
            })
            .addCase(fetchCryptoHistory.pending, (state) => {
                state.historyStatus = "loading"
                state.error = null
            })
            .addCase(fetchCryptoHistory.fulfilled, (state, action) => {
                state.historyStatus = "succeeded"
                state.historicalData = action.payload
            })
            .addCase(fetchCryptoHistory.rejected, (state, action) => {
                state.historyStatus = "failed"
                state.error = action.error.message ?? "Something went wrong"
            });
    },
})

export default cryptoSlice.reducer

