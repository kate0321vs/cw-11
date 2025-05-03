import {Container} from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import {Route, Routes} from "react-router-dom";
import Register from "./features/Users/Register.tsx";
import Login from "./features/Users/Login.tsx";
import Items from "./features/Items/Items.tsx";
import FullInfoItem from "./features/Items/FullInfoItem.tsx";



const App = () => {
    return (
        <>
            <header>
                <AppToolbar/>
            </header>
            <main>
                <Container maxWidth="xl">
                    <Routes>
                        <Route path="/register" element={<Register/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/" element={<Items/>} />
                        <Route path="/items" element={<Items/>} />
                        <Route path="/items/:id" element={<FullInfoItem/>} />
                        <Route path="*" element={(<h1>Not page found</h1>)}/>
                    </Routes>
                </Container>
            </main>
        </>
    );
};

export default App;