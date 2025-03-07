import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const setBusinessId = createAsyncThunk(
  "business/setBusinessId",
  async ({ id }, thunkAPI) => {
    try {


      return { business: id };
    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  business: ""
};

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    setBusinessIdSuccess: (state, action) => {
      state.business = action.payload.business;
    },
  },
  extraReducers: {
    [setBusinessId.fulfilled]: (state, action) => {

      state.business = action.payload.business;
    },
    [setBusinessId.rejected]: (state, action) => {

      state.business = "";
    },
  },
});

export const { setBusinessIdSuccess } = businessSlice.actions;
export const businessSliceReducer = businessSlice.reducer;
export default businessSlice;
