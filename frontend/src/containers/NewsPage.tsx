import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";
import {useEffect} from "react";
import {deleteComment, deleteMessage, getMessages, getOneNews} from "./Thunk/FetchSlice.ts";
import FormMessage from "../components/FormMessage.tsx";

const NewsPage = () => {

    const {id} = useParams();

    const dispatch = useDispatch<AppDispatch>();
    const {oneNews , allComments} = useSelector((state: RootState) => state.news);
    const {loader} = useSelector((state: RootState) => state.news);

    useEffect(() => {
        if(id){
            dispatch(getOneNews(id))
            dispatch(getMessages(id))
        }
    }, [dispatch]);

    const deleteMsg = (id: string) => {
        if(id){
            dispatch(deleteMessage(id))
            dispatch(deleteComment(id))
        }
    }

    return (
        <div>
            <div id="loader-container" style={{display: loader ? 'block' : 'none'}}>
                <div className="loader"></div>
            </div>
            {oneNews.length > 0 ? (
                oneNews.map((item) => (
                    <div key={item.id} className="news-item" style={{width:'850px'}}>
                        <h1 className="news-title">{item.title}</h1>
                        <p className="news-date">{item.date.replace('T', ' ').replace('Z', ' ').slice(0, -5)}</p>
                        <p className="news-description">{item.description}</p>
                        {item.image && (
                            <img
                                className="news-image"
                                src={`http://localhost:8000/images/${item.image}`}
                                alt={item.title}
                                style={{width:'300px', marginLeft:'300px'}}
                            />
                        )}
                    </div>
                ))
            ) : (
                <div className="no-news">Troubles with news, try later</div>
            )}
            <div>
                <h2>Commentaries</h2>
            </div>
            {allComments ? (
                allComments.map((item) => (
                    <div key={item.id} style={{
                        maxWidth: '850px',
                        margin: '20px auto',
                        padding: '15px 20px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#f9f9f9',
                    }}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <div>
                                <h2 style={{margin: '0 0 10px', color: '#333'}}>{item.author}</h2>
                                <p style={{margin: 0, color: '#555'}}>{item.text}</p>
                            </div>
                            <div style={{marginLeft: 'auto'}}>
                                <button onClick={(() => deleteMsg(item.id))}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div>There are no messages</div>
            )}

            <div>
                <FormMessage/>
            </div>
        </div>
    );
};

export default NewsPage;