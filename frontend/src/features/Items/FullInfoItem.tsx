import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, CircularProgress, Divider, Grid, Typography} from "@mui/material";
import {baseURL} from "../../globalConstants.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectDeleteItemLoading, selectItem, selectItemLoading} from "./itemsSlice.ts";
import {useEffect} from "react";
import {deleteItem, fetchItem} from "./ItemsThunk.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import DeleteIcon from '@mui/icons-material/Delete';
import {selectUser} from "../Users/usersSlice.ts";
import {toast} from "react-toastify";


const FullInfoItem = () => {
    const dispatch = useAppDispatch();
    const item = useAppSelector(selectItem);
    const loading = useAppSelector(selectItemLoading);
    const deleteLoading = useAppSelector(selectDeleteItemLoading);
    const user = useAppSelector(selectUser);
    const {id} = useParams() as { id: string };
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchItem(id));
    }, [dispatch, id]);

    const onDeleteItem = async () => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            await dispatch(deleteItem(id));
            toast.error('Item was deleted Successfully!');
            navigate('/');
        }
    }

    return (
        loading ? <Spinner/> :
            item ?
                (<Box maxWidth="lg" >
                        <Grid container direction="row" spacing={2}  pt={5}>
                                <Grid sx={{flex: 1, display: 'flex', justifyContent: 'flex-end', mr: 3}} >
                                    <img
                                        src={baseURL + '/' + item.image}
                                        alt={item.title}
                                        style={{
                                            maxWidth: '300px',
                                            height: 500,
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                            border: '1px solid #ccc',
                                        }}
                                    />
                                </Grid>
                            <Grid sx={{flex: 1, display: 'flex', flexDirection: 'column', mt: 3}}>
                                <Typography variant="h4" component="div" sx={{fontWeight: "bold", mb: 1}}>
                                    {item.title}
                                </Typography>
                                <Typography variant="h5" sx={{mb: 2, fontWeight: 500, color:'palevioletred'}}>
                                    {item.price}$
                                </Typography>
                                <Divider/>
                                <Typography mt={3} component="p">
                                    {item.description}
                                </Typography>
                                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                                    <strong>Category:</strong> {item.category.name}
                                </Typography>
                                <Typography variant="subtitle1">
                                    <strong>Seller:</strong> {item.user.displayName}
                                </Typography>
                                <Typography variant="subtitle1">
                                    <strong>Phone:</strong> {item.user.phoneNumber}
                                </Typography>
                                {user?.username === item.user.username &&
                                    <Box mt='auto' mb={3}>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        startIcon={deleteLoading ? <CircularProgress/> : <DeleteIcon />}
                                        onClick={() => onDeleteItem()}
                                    >
                                        Delete
                                    </Button>
                                </Box>}
                            </Grid>
                        </Grid>
                    </Box>
                ) :
                <Typography>Item not found</Typography>
    );
};

export default FullInfoItem;