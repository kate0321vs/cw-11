import {Container, Typography} from "@mui/material";
import FormItem from "./components/FormItem/FormItem.tsx";
import { useAppSelector } from "../../app/hooks.ts";
import {selectUser} from "../Users/usersSlice.ts";
import {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const NewItem = () => {
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user]);

    return (
        <Container maxWidth="sm" >
            <Typography variant='h4' my={3} textAlign='center'>Add item</Typography>
            <FormItem/>
        </Container>
    );
};

export default NewItem;