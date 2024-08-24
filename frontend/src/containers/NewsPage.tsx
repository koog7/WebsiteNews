import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";
import {useEffect} from "react";
import {getOneNews} from "./Thunk/FetchSlice.ts";

const NewsPage = () => {

    const {id} = useParams();

    const dispatch = useDispatch<AppDispatch>();
    const {oneNews} = useSelector((state: RootState) => state.news);

    useEffect(() => {
        dispatch(getOneNews(id))
        console.log(oneNews)
    }, [dispatch]);

    return (
        <div>
            {oneNews.length > 0 ? (
                oneNews.map((item) => (
                    <div key={item.id} style={{width: '900px'}}>
                        <h1>{item.title}</h1>
                        <p>{item.date.replace('T', ' ').replace('Z', ' ').slice(0, -5)}</p>
                        <p>{item.description}</p>
                        {item.image && (
                            <img style={{width: '150px', height: '150px'}}
                                 src={`http://localhost:8000/images/${item.image}`} alt={item.title}/>
                        )}
                    </div>
                ))
            ) : (
                <div>Troubles with news , try later</div>
            )}
        </div>
    );
};

export default NewsPage;