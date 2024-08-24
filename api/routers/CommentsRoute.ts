import express from 'express';
import fileDb from "../fileDB";

const CommentsRouter = express.Router();
CommentsRouter.use(express.json());


CommentsRouter.get('/', async (req, res) => {
    const newsId = req.query.news_id as string;

    if(newsId){
        console.log(newsId)
    }
    res.send('test')
});

CommentsRouter.post('/', async (req, res) => {
    await fileDb.init('comment');
    await fileDb.init('news');

    const allComments = await fileDb.getItems('comment') || [];
    const allNews = await fileDb.getItems('news') || [];

    const {idNews} = req.body;

    const newsExist = allNews.some(newsItem => newsItem.id === idNews);

    if (!newsExist) {
        return res.status(400).send('News ID does not exist');
    }

    const idCheck = new Set(allComments.map(message => message.id));
    let idNew = allComments.length + 1;

    while (idCheck.has(`${idNew}`)) {
        idNew++;
    }

    const messages = {
        id: `${idNew}`,
        idNews : req.body.idNews,
        author: req.body.author ?  req.body.author : 'Anonymous',
        text: req.body.text,
    }

    await fileDb.addItem(messages, 'comment');

    res.send(messages)
});

export default CommentsRouter;