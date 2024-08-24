import {Button} from "@mui/material";
import NewsCard from "../components/NewsCard.tsx";

const Home = () => {
    return (
        <div>
            <div>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <div>
                        <h1>Posts</h1>
                    </div>
                    <div>
                        <Button variant="contained">Add new post</Button>
                    </div>
                </div>
                <div>
                    <NewsCard />
                </div>
            </div>
        </div>
    );
};

export default Home;