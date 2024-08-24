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

    useEffect(() => {
        dispatch(getOneNews(id))
        dispatch(getMessages(id))
    }, [dispatch]);

    const deleteMsg = (id: string) => {
      dispatch(deleteMessage(id))
      dispatch(deleteComment(id))
    }

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
            <div>
                <h2>Commentaries</h2>
            </div>
            {allComments ? (
                allComments.map((item) => (
                    <div key={item.id} style={{
                        maxWidth: '900px',
                        margin: '20px auto',
                        padding: '15px 20px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#f9f9f9',
                    }}>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <div>
                                <h2 style={{margin: '0 0 10px', color: '#333'}}>{item.author}</h2>
                                <p style={{margin: 0, color: '#555'}}>{item.text}</p>
                            </div>
                            <div style={{marginLeft:'auto'}}>
                                <button onClick={(() => deleteMsg(item.id))}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div>There are no messages</div>
            )}

            <div>
                <FormMessage />
            </div>
        </div>
    );
};

export default NewsPage;