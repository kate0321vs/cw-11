import {createAsyncThunk} from "@reduxjs/toolkit";
import {ICategory} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const categoriesFetch = createAsyncThunk<ICategory[]>(
    'categories/fetchAll',
    async () => {
        const response = await axiosApi.get('/categories');
        return response.data;
    }
);