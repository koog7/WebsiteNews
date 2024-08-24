import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";

const CreateForm = () => {

    const [title , setTitle] = useState<string>('');
    const [content , setContent] = useState<string>('');

    useEffect(() => {
        console.log(title , content)
    }, [title , content]);
    return (
        <div>
            <h1 style={{marginLeft:'15px'}}>Add new post</h1>
            <form style={{display:'flex', marginTop:'50px', flexDirection:'column'}}>
                <TextField
                    id="outlined-controlled"
                    label="Title"
                    value={title}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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
                <input type={"file"} style={{marginTop:'20px'}}/>

                <Button variant="contained" style={{marginTop:'20px'}}>Send!</Button>
            </form>
        </div>
    );
};

export default CreateForm;