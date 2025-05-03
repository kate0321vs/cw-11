import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectItemLoading, selectItems} from "./itemsSlice.ts";
import {useEffect} from "react";
import {fetchItems} from "./ItemsThunk.ts";
import SiteBar from "./components/SilteBar/SiteBar.tsx";
import {useSearchParams} from "react-router-dom";
import OneItem from "./components/OneItem/OneItem.tsx";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {Box, Typography} from "@mui/material";

const Items = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectItems);
    const loading = useAppSelector(selectItemLoading);
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");

    useEffect(() => {
        dispatch(fetchItems(category || undefined))
    }, [dispatch, category]);

    return (
        <>
            <Box sx={{ display: 'flex' }}>

                <Box sx={{ width: 250, flexShrink: 0 }}>
                    <SiteBar />
                </Box>

                <Box sx={{ flexGrow: 1, pl: 3 }}>
                    {loading ? (
                        <Spinner />
                    ) : items && items.length > 0 ? (
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 2,
                                justifyContent: 'flex-start',
                            }}
                        >
                            {items.map((item) => (
                                <OneItem
                                    key={item._id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                    id={item._id}
                                />
                            ))}
                        </Box>
                    ) : (
                        <Typography>No items yet</Typography>
                    )}
                </Box>

            </Box>
        </>

    );
};

export default Items;