import {Button} from "@mui/material";
import NewsCard from "../components/NewsCard.tsx";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";
import {useEffect} from "react";
import {getNews} from "./Thunk/FetchSlice.ts";

const Home = () => {

    const dispatch = useDispatch<AppDispatch>();
    const {allNews} = useSelector((state: RootState) => state.news);
    const {loader} = useSelector((state: RootState) => state.news);
    useEffect(() => {
        dispatch(getNews())
        console.log(loader)
    }, [dispatch]);


    return (
        <div>
            <div id="loader-container" style={{display: loader ? 'block' : 'none'}}>
                <div className="loader"></div>
            </div>
            <div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div>
                        <h1>Posts</h1>
                    </div>
                    <div>
                        <NavLink to={'/form'}><Button variant="contained">Add new post</Button></NavLink>
                    </div>
                </div>
                <div>
                    {Array.isArray(allNews) ? (
                        allNews.map((item) => (
                            <NewsCard
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                date={item.date}
                            />
                        ))
                    ) : (
                        <div>Some error occurred</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;