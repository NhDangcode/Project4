import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCategoryServices } from "../../services/categoryServices";

export const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [],
    },
    extraReducers: (builder) => {
        builder.addCase(getAllCategoryApi.fulfilled, (state, action) => {
            state.categories = action.payload;
        });
    },
});

export const getAllCategoryApi = createAsyncThunk(
    "category/getAllCategory",
    async () => {
        const respone = await getAllCategoryServices();
        console.log(respone.data);
        return respone.data;
    }
);
