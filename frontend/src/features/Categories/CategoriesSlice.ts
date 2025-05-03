import {ICategory} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {categoriesFetch} from "./CategoriesThunk.ts";
import {RootState} from "../../app/store.ts";

interface CategoriesState {
    categories: ICategory[];
    loading: boolean;
}

const initialState: CategoriesState = {
    categories: [],
    loading: false,
};

export const CategoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(categoriesFetch.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(categoriesFetch.fulfilled, (state, {payload: categories}) => {
            state.loading = false;
            state.categories = categories;
        });
        builder.addCase(categoriesFetch.rejected, (state) => {
            state.loading = false;
        });
    }
});

export const categoriesReducer = CategoriesSlice.reducer;
export const selectCategories = (state: RootState) => state.categories.categories;
export const selectCategoriesLoading = (state: RootState) => state.categories.loading;