import express from 'express';

const CommentsRouter = express.Router();
CommentsRouter.use(express.json());


CommentsRouter.get('/', async (req, res) => {
    res.send('test')
});

export default CommentsRouter;