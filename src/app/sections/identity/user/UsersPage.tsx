import {Route, Routes} from "react-router-dom";
import {UsersIndex} from "./UsersIndex";
import {UsersCreate} from "./UsersCreate";
import {UsersEdit} from "./UsersEdit";

const UsersPage = () => (
    <Routes>
        <Route>
            <Route path='/' element={<UsersIndex/>}/>
            <Route path='/create' element={<UsersCreate/>}/>
            <Route path='/:user/edit' element={<UsersEdit/>}/>
            <Route index element={<UsersIndex/>}/>
        </Route>
    </Routes>
)


export {UsersPage}