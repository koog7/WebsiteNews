import express from 'express';
import CommentsRouter from "./routers/CommentsRoute";
import NewsRouter from "./routers/NewsRoute";
import cors from 'cors';

const app = express();
const port = 8000;

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/news', NewsRouter)
app.use('/comments', CommentsRouter);

const run = async () => {

    app.listen(port, () => {
        console.log('Server starter : http://127.0.0.1:' + port);
    });
};

run().catch(console.error);