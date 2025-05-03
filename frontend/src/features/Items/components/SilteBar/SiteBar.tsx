import {Box, Divider, List, ListItemButton, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {selectCategories} from "../../../Categories/CategoriesSlice.ts";
import {useEffect} from "react";
import {categoriesFetch} from "../../../Categories/CategoriesThunk.ts";
import {NavLink} from "react-router-dom";

const SiteBar= () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);

    useEffect(() => {
        dispatch(categoriesFetch())
    }, [dispatch])

    return (
        <Box sx={{
            maxWidth: 300,
            backgroundColor: '#f9f9f9',
            p: 2,
            borderRadius: 2,
            boxShadow: 1
        }}>
            <Typography  sx={{ fontWeight: 600, mb: 2, ml: 2 }} variant="h6" gutterBottom>
                Categories
            </Typography>
            <Divider sx={{ mt: 2 }} />
            <List>
                <ListItemButton component={NavLink} to="/">
                    All items
                </ListItemButton>
                {categories.map((category) => (
                    <ListItemButton component={NavLink} to={`?category=${category._id}`}
                        sx={{borderRadius: 1, mb: 1}}
                        key={category._id}>
                        {category.name}
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
};

export default SiteBar;