import './App.css'
import Home from "./containers/Home.tsx";
import {Route, Routes} from "react-router-dom";
import NotFound from "./containers/NotFound.tsx";

const App = () => {
    return(
        <>
            <Routes>
                <Route path="/" element={(
                    <Home />
                )}/>
                <Route path="/*" element={(
                    <NotFound />
                )}/>
            </Routes>
        </>
    )
};

export default App
