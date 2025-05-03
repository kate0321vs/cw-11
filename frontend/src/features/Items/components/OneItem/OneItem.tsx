import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import {baseURL} from "../../../../globalConstants.ts";
import { NavLink } from "react-router-dom";

interface Props {
    title: string;
    image: string;
    price: number;
    id: string;
}



const OneItem: React.FC<Props> = ({title, image, price, id}) => {
    return (
            <Card style={{textDecoration: "none"}} component={NavLink} to={`/items/${id}`} sx={{width: 345}}>
                <CardMedia
                    sx={{height: 200}}
                    image={baseURL + '/' + image}
                    title={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2">
                        {price}$
                    </Typography>
                </CardContent>
            </Card>
    );
};

export default OneItem;