import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
    page: "",
    rowsPerPage: "5"
};
const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload
        },
        setRowsPerPage: (state, action) => {
            state.rowsPerPage = action.payload
        }
    }
});
export const { setPage, setRowsPerPage } = paginationSlice.actions;
export const paginationSliceReducer = paginationSlice.reducer;
export default paginationSlice;
