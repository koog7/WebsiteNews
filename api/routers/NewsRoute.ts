import express from 'express';
import fileDb from "../fileDB";
import {imagesUpload} from "../multer";


const NewsRouter = express.Router();
NewsRouter.use(express.json());


NewsRouter.get('/', async (req, res) => {
    res.send('test')
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