import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const setBranchId = createAsyncThunk(
    "location/setLocationId",
    async ({ id }, thunkAPI) => {
        try {
            return { branch: id };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
const initialState = {
    location: ""
};
const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setLocationIdSuccess: (state, action) => {
            state.location = action.payload.location;
        },
    },
    extraReducers: {
        [setLocationId.fulfilled]: (state, action) => {
            state.location = action.payload.branch;
        },
        [setLocationId.rejected]: (state, action) => {
            state.location = "";
        },
    },
});
export const { setLocationIdSuccess } = locationSlice.actions;
export const locationliceReducer = locationSlice.reducer;
export default locationSlice;
