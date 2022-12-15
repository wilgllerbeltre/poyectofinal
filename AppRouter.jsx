import { Home } from "../componentes/Home";
import { Login } from "../componentes/Login";
import { NewPost } from "../componentes/NewPost";
import { Register } from "../componentes/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const AppRouter = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/register" element={<Register/>}/>
                <Route exact path="/new/post" element={<NewPost/>}/>
            </Routes>
        </BrowserRouter>
    )
}