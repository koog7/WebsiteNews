import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
const NewsCard = () => {
    return (
        <div>
            <Card sx={{ display: 'flex', alignItems: 'center', maxWidth: 900 , marginTop:'20px'}}>
                <CardMedia
                    component="img"
                    sx={{ width: 150 }}
                    image="../public/150.png"
                    alt="img of news"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
                    <CardContent sx={{ textAlign: 'left' }}>
                        <Typography variant="h5" component="div">
                            <NavLink className="nav-link" to="/">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis fermentum faucibus.</NavLink>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Date: August 24, 2024
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