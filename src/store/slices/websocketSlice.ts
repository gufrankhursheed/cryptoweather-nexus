import { createSlice } from "@reduxjs/toolkit";

interface WebSocketState {
  btcPrice: number | null;
  ethPrice: number | null;
  notifications: { type: string; message: string }[];
}

const initialState: WebSocketState = {
  btcPrice: null,
  ethPrice: null,
  notifications: [],
};

const websocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    updateBTCPrice: (state, action) => {
      state.btcPrice = action.payload
    },
    updateETHPrice: (state, action) => {
      state.ethPrice = action.payload
    },
    addNotification: (
      state,
      action
    ) => {
      state.notifications.push(action.payload);
    },
  },
});

export const { updateBTCPrice, updateETHPrice, addNotification } = websocketSlice.actions;
export default websocketSlice.reducer;
