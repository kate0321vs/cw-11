import {
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select, SelectChangeEvent,
    TextField
} from "@mui/material";
import Grid from '@mui/material/Grid';
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import SendIcon from '@mui/icons-material/Send';
import {useNavigate} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {selectCreateItemLoading} from "../../itemsSlice.ts";
import {selectCategories} from "../../../Categories/CategoriesSlice.ts";
import {IMutationItem} from "../../../../types";
import {createItem} from "../../ItemsThunk.ts";
import FileInput from "../../../../components/UI/FileInput/FileInput.tsx";
import {categoriesFetch} from "../../../Categories/CategoriesThunk.ts";

const initialState = {
    title: '',
    description: '',
    image: null,
    price: '',
    category: "",
}

const PostForm = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectCreateItemLoading)
    const [state, setState] = useState<IMutationItem>(initialState);
    const navigate = useNavigate();
    const categories = useAppSelector(selectCategories);

    useEffect(() => {
        dispatch(categoriesFetch());
    }, [dispatch]);

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(createItem(state));
        toast.success('Item was added Successfully!');
        navigate('/')
        setState(initialState);
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const { name, value } = e.target;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };


    const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement> ) => {
        const { name, files } = e.target;
        if (files) {
            setState(prevState => {
                return {...prevState,
                    [name]: files[0]};
            })
        }
    };

    return (
        <form
            autoComplete="off"
            onSubmit={submitFormHandler}
        >
            <Grid container direction="column" spacing={2}>
                <Grid>
                    <TextField
                        id="title"
                        label="Title"
                        value={state.title}
                        onChange={inputChangeHandler}
                        name="title"
                        fullWidth
                        required
                    />
                </Grid>

                <Grid>
                    <TextField
                        id="description"
                        label="Description"
                        value={state.description}
                        onChange={inputChangeHandler}
                        name="description"
                        required
                        fullWidth
                    />
                </Grid>

                <Grid>
                    <FormControl fullWidth required>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category"
                            name="category"
                            value={state.category}
                            onChange={inputChangeHandler}
                            label="Category"
                        >
                            {categories.map((category) => (
                                <MenuItem key={category._id} value={category._id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid>
                    <FileInput onChange={filesInputChangeHandler} name="image" label="Image" file={state.image} />
                </Grid>

                <Grid>
                    <TextField
                        id="price"
                        label="Price"
                        value={state.price}
                        onChange={inputChangeHandler}
                        name="price"
                        fullWidth
                        required
                    />
                </Grid>

                <Grid>
                    <Button
                        endIcon={loading ? <CircularProgress size={24} /> : <SendIcon />}
                        size="small"
                        disabled={loading}
                        variant="contained"
                        type="submit"
                        sx={{backgroundColor: 'palevioletred', fontWeight: '500'}}
                    >
                        Send
                    </Button>
                </Grid>
            </Grid>

        </form>
    );
};

export default PostForm;