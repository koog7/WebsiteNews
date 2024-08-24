import { promises as fs } from 'fs';
import path from 'path';

const comments = path.join(__dirname, 'database', 'commentsDB.json');
const news = path.join(__dirname, 'database', 'newsDB.json');

export interface News {
    id: string;
    title: string;
    description: string;
    image?: string | null;
    date: string;
}
export interface Comments {
    id: string;
    idNews: string;
    author?: string;
    text: string;
}

let newsData: News[] = [];
let commentData: Comments[] = [];


type DataType = 'news' | 'comment';

const fileDb = {
    async init(name: DataType) {
        if(name === 'news'){
            try {
                const fileContents = await fs.readFile(news);
                newsData = JSON.parse(fileContents.toString());
            } catch (e) {
                newsData = [];
            }
        }else if(name === 'comment'){
            try {
                const fileContents = await fs.readFile(comments);
                commentData = JSON.parse(fileContents.toString());
            } catch (e) {
                commentData = [];
            }
        }
    },
    async getItems(name: DataType) {
        if(name === 'news'){
            return newsData;
        }else if(name === 'comment'){
            return commentData;
        }
    },
    async addItem(item: News | Comments, name: DataType) {
        if (name === 'news') {
            newsData.push(item as News);
            await this.save(name);
        } else if (name === 'comment') {
            commentData.push(item as Comments);
            await this.save(name);
        }
    },
    async removeItem(id: string, name: DataType) {
        if (name === 'news') {
            const index = newsData.findIndex(item => item.id === id);
            if (index !== -1) {
                newsData.splice(index, 1);
                await this.save(name);
            }
        } else if (name === 'comment') {
            const index = commentData.findIndex(item => item.id === id);
            if (index !== -1) {
                commentData.splice(index, 1);
                await this.save(name);
            }
        }
    },
    async save(name: DataType) {
        if(name === 'news'){
            return fs.writeFile(news, JSON.stringify(newsData , null , 2));
        }else if(name === 'comment'){
            return fs.writeFile(comments, JSON.stringify(commentData , null , 2));
        }
    }
};



export default fileDb;