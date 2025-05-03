import {IItem} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createItem, deleteItem, fetchItem, fetchItems} from "./ItemsThunk.ts";
import {RootState} from "../../app/store.ts";

interface itemsState {
    items: IItem[];
    item: IItem | null;
    fetchLoading: boolean;
    fetchOneItemLoading: boolean;
    createLoading: boolean;
    deleteLoading: boolean;
}

const initialState: itemsState = {
    items: [],
    item: null,
    fetchLoading: false,
    fetchOneItemLoading: false,
    createLoading: false,
    deleteLoading: false,
};

const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchItems.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchItems.fulfilled, (state, {payload: items}) => {
            state.fetchLoading = false;
            state.items = items;
        })
        builder.addCase(fetchItems.rejected, (state) => {
            state.fetchLoading = false;
        });

        builder.addCase(fetchItem.pending, (state) => {
            state.fetchOneItemLoading = true;
        });
        builder.addCase(fetchItem.fulfilled, (state, {payload: item}) => {
            state.fetchOneItemLoading = false;
            state.item = item;
        })
        builder.addCase(fetchItem.rejected, (state) => {
            state.fetchOneItemLoading = false;
        });

        builder.addCase(createItem.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createItem.fulfilled, (state) => {
            state.createLoading = false;
        })
        builder.addCase(createItem.rejected, (state) => {
            state.createLoading = false;
        });

        builder.addCase(deleteItem.pending, (state) => {
            state.deleteLoading = true;
        });
        builder.addCase(deleteItem.fulfilled, (state) => {
            state.deleteLoading = false;
        })
        builder.addCase(deleteItem.rejected, (state) => {
            state.deleteLoading = false;
        });
    }
});

export const itemsReducer = itemsSlice.reducer;

export const selectItems = (state: RootState) => state.items.items;
export const selectItem = (state: RootState) => state.items.item;
export const selectItemsLoading = (state: RootState) => state.items.fetchLoading;
export const selectItemLoading = (state: RootState) => state.items.fetchOneItemLoading;
export const selectDeleteItemLoading = (state: RootState) => state.items.deleteLoading;
export const selectCreateItemLoading = (state: RootState) => state.items.createLoading;