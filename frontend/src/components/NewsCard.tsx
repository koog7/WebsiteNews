import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import * as React from "react";

interface NewsProps{
    id: string;
    title: string;
    image?: string | null;
    date: string;
}
const NewsCard:React.FC<NewsProps> = ({id, title , image , date}) => {
    return (
        <div>
            <Card sx={{ display: 'flex', alignItems: 'center', maxWidth: 900 , marginTop:'20px'}}>
                <CardMedia
                    component="img"
                    sx={{ width: '150px' , height: '150px'}}
                    image= {`http://localhost:8000/images/${image}`}
                    alt="img of news"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
                    <CardContent sx={{ textAlign: 'left' }}>
                        <Typography variant="h5" component="div" style={{width:'600px'}}>
                            <NavLink className="nav-link" to={`/news/${id}`}>{title}</NavLink>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {date.replace('T', ' ').replace('Z', ' ').slice(0, -5)}
                        </Typography>
                    </CardContent>
                </Box>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button size="small" color="error">
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default NewsCard;