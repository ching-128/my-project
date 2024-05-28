// src/jsonDataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const jsonDataSlice = createSlice({
    name: 'jsonData',
    initialState: {
        project_data: null,
    },
    reducers: {
        setJsonData: (state, action) => {
            state.project_data = action.payload.project_data;
        },
        clearJsonData: (state) => {
            state.project_data = null;
        },
    },
});

export const { setJsonData, clearJsonData } = jsonDataSlice.actions;
export default jsonDataSlice.reducer;