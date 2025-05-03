import {createAsyncThunk} from "@reduxjs/toolkit";
import {IItem, IMutationItem} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {RootState} from "../../app/store.ts";

export const fetchItems = createAsyncThunk<IItem[], string | undefined>(
    'items/fetchAll',
    async (category) => {
        const response = await axiosApi.get('/items', {
            params: category ? { category } : undefined});

        return response.data;
    }
);

export const fetchItem = createAsyncThunk<IItem, string>(
    'items/fetchOne',
    async (id) => {
        const response = await axiosApi.get(`/items/${id}`)
        return response.data;
    }
);

export const createItem = createAsyncThunk<void, IMutationItem, {state: RootState}>(
    'items/create',
    async (item, thunkAPI) => {
        const usersState = thunkAPI.getState().users;
        const formData = new FormData();
        const keys = Object.keys(item) as (keyof IMutationItem)[];

        keys.forEach((key) => {
            const value = item[key];

            if (value !== null) {
                formData.append(key, value);
            }
        });
        await axiosApi.post("/items",
            formData,
            {
                headers: {
                    "Authorization": usersState.user?.token,
                }
            });
    }
);

export const deleteItem = createAsyncThunk<void, string, {state: RootState}>(
    'items/delete',
    async (id, ThunkApi) => {
        const usersState = ThunkApi.getState().users
        await axiosApi.delete(`/items/${id}`,
            {headers:
                    {"Authorization": usersState.user?.token}});
    }
)