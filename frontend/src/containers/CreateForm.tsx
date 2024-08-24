import {ChangeEvent, FormEvent, useRef, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../app/store.ts";
import {postNews} from "./Thunk/FetchSlice.ts";

const CreateForm = () => {

    const dispatch = useDispatch<AppDispatch>();

    const urlFile = useRef(null)
    const [file, setFile] = useState<File | null>(null);

    const [title , setTitle] = useState<string>('');
    const [content , setContent] = useState<string>('');


    const submitData = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(title && content){
            dispatch(postNews({ title: title, description: content , image: file || undefined}));

            setFile(null);
            setTitle('');
            setContent('');

            if (urlFile.current) {
                urlFile.current.value = '';
            }
        }
    };

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target.files

        if (fileInput && fileInput[0]) {
            setFile(fileInput[0])
        } else {
            setFile(null)
        }
    }

    return (
        <div>
            <h1 style={{margin: '0 0 20px 340px'}}>Add new post</h1>
            <form onSubmit={submitData} style={{display:'flex', marginTop:'50px', flexDirection:'column', width:'400px', justifyContent:'center', margin: '0 auto'}}>
                <TextField
                    id="outlined-controlled"
                    label="Title"
                    value={title}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setTitle(event.target.value);
                    }}
                    sx={{
                        marginBottom:'10px',
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
                <input type={"file"} style={{marginTop:'20px'}} ref={urlFile} accept="image/*" onChange={onFileChange}/>

                <Button type={'submit'} variant="contained" style={{marginTop:'20px'}}>Send!</Button>
            </form>
        </div>
    );
};

export default CreateForm;