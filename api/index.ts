import express from 'express';
import CommentsRouter from "./routers/CommentsRoute";

const app = express();
const port = 8000;

app.use(express.json())
app.use(express.static('public'))

app.use('/news', AccountingRoute)
app.use('/comments', CommentsRouter);

const run = async () => {

    app.listen(port, () => {
        console.log('Server starter : http://127.0.0.1:' + port);
    });
};

run().catch(console.error);