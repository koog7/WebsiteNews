import {Button, TextField} from "@mui/material";
import {ChangeEvent, FormEvent, useState} from "react";
import {postMessage, postNews} from "../containers/Thunk/FetchSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../app/store.ts";
import {useParams} from "react-router-dom";

const FormMessage = () => {

    const dispatch = useDispatch<AppDispatch>();
    const [title , setTitle] = useState<string>('');
    const [content , setContent] = useState<string>('');
    const {id} = useParams();
    const submitData = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(title && content){
            dispatch(postMessage({ idNews: id, author: title , text: content}));

            setTitle('');
            setContent('');
        }
    };

    return (
        <div>
            <h2>Send a message</h2>
                <form onSubmit={submitData} style={{
                    display: 'flex',
                    marginTop: '50px',
                    flexDirection: 'column',
                    width: '400px',
                    justifyContent: 'center',
                    margin: '0 auto'
                }}>
                    <TextField
                        id="outlined-controlled"
                        label="Title"
                        value={title}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setTitle(event.target.value);
                        }}
                        sx={{
                            marginBottom: '10px',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'white',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'white',
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: 'white',
                            },
                            '& .MuiInputLabel-root': {
                                color: 'white',
                            },
                        }}
                    />
                    <TextField
                        id="outlined-controlled"
                        label="Content"
                        value={content}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setContent(event.target.value);
                        }}

                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'white'
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'white',
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: 'white',
                            },
                            '& .MuiInputLabel-root': {
                                color: 'white',
                            },
                        }}
                    />
                    <Button type={'submit'} variant="contained" style={{marginTop: '20px'}}>Send!</Button>
                </form>
        </div>
    );
};

export default FormMessage;