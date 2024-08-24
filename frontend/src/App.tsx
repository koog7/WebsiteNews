import './App.css'
import Home from "./containers/Home.tsx";
import {Route, Routes} from "react-router-dom";
import NotFound from "./containers/NotFound.tsx";
import CreateForm from "./containers/CreateForm.tsx";

const App = () => {
    return(
        <>
            <Routes>
                <Route path="/" element={(
                    <Home />
                )}/>
                <Route path="/form" element={(
                    <CreateForm />
                )}/>
                <Route path="/*" element={(
                    <NotFound />
                )}/>
            </Routes>
        </>
    )
};

export default App
