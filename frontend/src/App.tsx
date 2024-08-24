import './App.css'
import Home from "./containers/Home.tsx";
import {NavLink, Route, Routes} from "react-router-dom";
import NotFound from "./containers/NotFound.tsx";
import CreateForm from "./containers/CreateForm.tsx";

const App = () => {
    return(
        <>
            <div style={{backgroundColor: '#404040', width: '900px', minHeight: '50px', padding: '2px'}}>
                <h2 style={{marginLeft: '10px'}}><NavLink className="nav-link" to="/"
                                                          style={{textDecoration: 'none', color: 'white'}}>Posts</NavLink></h2>
            </div>
            <hr/>
            <Routes>
                <Route path="/" element={(
                    <Home/>
                )}/>
                <Route path="/form" element={(
                    <CreateForm/>
                )}/>
                <Route path="/*" element={(
                    <NotFound/>
                )}/>
            </Routes>
        </>
    )
};

export default App
