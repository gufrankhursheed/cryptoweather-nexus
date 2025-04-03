import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Weather {
    id: number;
    name: string;
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
    };
    weather: {
        main: string;
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
        gust?: number;
    };
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
}

interface WeatherState {
    data: Weather[];
    status: string;
    error: string | null;
}

const initialState: WeatherState = {
    data: [],
    status: "idle",
    error: null,
};

export const fetchWeather = createAsyncThunk("weather/fetch", async () => {
    const cities = ["New York", "London", "Tokyo"]
    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY

    const response = await Promise.all(
        cities.map(async (city) => {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
            return res.json()
        })
    )

    return response
})

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.data = action.payload
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message ?? "Something went wrong"
            })
    },
})

export default weatherSlice.reducer