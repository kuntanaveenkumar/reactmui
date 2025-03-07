import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchLeftbar = createAsyncThunk(
    "setLeftbar",
    async ({ open }, thunkAPI) => {
        try {
            return { open: open };
        } catch (error) {
            return thunkAPI.rejectWithValue();
        }
    }
);
const initialState = {
    open: true
}
const leftbarSlice = createSlice({
    name: "open",
    initialState,
    reducers: {
        setLeftbarSuccess: (state, action) => {
            state.open = action.payload.open;
           
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchLeftbar.pending, (state) => {

            })
            .addCase(fetchLeftbar.fulfilled, (state, action) => {

                state.open = (action.payload.open)
              
            })
            .addCase(fetchLeftbar.rejected, (state, action) => {

            })
});

export const { setLeftbarSuccess } = leftbarSlice.actions;
export const leftbarSliceReducer = leftbarSlice.reducer;
export default leftbarSlice;