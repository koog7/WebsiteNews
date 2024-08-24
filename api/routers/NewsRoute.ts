import express from 'express';

const NewsRouter = express.Router();
NewsRouter.use(express.json());


NewsRouter.get('/', async (req, res) => {
    res.send('test')
});

export default NewsRouter;