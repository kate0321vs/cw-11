import {createAsyncThunk} from "@reduxjs/toolkit";
import { IItem, IMutationItem} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {RootState} from "../../app/store.ts";
import {isAxiosError} from "axios";

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

export const createItem = createAsyncThunk<
    void,
    IMutationItem,
    {state: RootState, rejectValue: string | null}>(
    'items/create',
    async (item, thunkAPI) => {
        try {
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
        } catch (error) {
            if (isAxiosError(error) && error.response && error.response.status === 400) {
                return thunkAPI.rejectWithValue(error.response.data);
            }
            throw error;
        }
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