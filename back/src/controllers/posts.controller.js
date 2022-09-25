import {getConn} from '../database/database';

const getPosts = async (req,res) =>{
    try {
        const conn = await getConn();
        const result = await conn.query('SELECT * FROM ds_posts');
        res.json(result);
    } catch (error) {
        res.send(error.message);
    }
};

export const methods = {
    getPosts
};