import express from 'express';
import fileDb from "../fileDB";
import {imagesUpload} from "../multer";


const NewsRouter = express.Router();
NewsRouter.use(express.json());


NewsRouter.get('/', async (req, res) => {
    await fileDb.init('news')
    const allNews = await fileDb.getItems('news')|| [];

    const getSpecificKeys = allNews.map(message => {
        if ('title' in message) {
            return { id: message.id, title: message.title , image : message.image , date : message.date};
        }
    });

    res.send(getSpecificKeys)
});


NewsRouter.get('/:id', async (req, res) => {
    await fileDb.init('news')
    const {id} = req.params;

    const allNews = await fileDb.getItems('news')|| [];
    const getMsgById = allNews.filter(x => x.id === id);

    if(getMsgById.length > 0){
        res.send(getMsgById)
    }else{
        res.send('Not found')
    }
});

NewsRouter.post('/', imagesUpload.single('image') , async (req, res) => {
    await fileDb.init('news');
    const { title , description } = req.body;

    if(!title || !description){
        return res.status(400).send('some of field are empty')
    }

    const allMessages = await fileDb.getItems('news') || [];

    const idCheck = new Set(allMessages.map(message => message.id));
    let idNew = allMessages.length + 1;

    while (idCheck.has(`${idNew}`)) {
        idNew++;
    }

    const messages = {
        id: `${idNew}`,
        title : req.body.title,
        description: req.body.description,
        image: req.file ? req.file.filename : null,
        date: new Date().toISOString(),
    }

    await fileDb.addItem(messages , 'news');

    res.send(messages)
});

export default NewsRouter;