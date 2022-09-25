import {getConn} from '../database/database';

const getPosts = async (req,res) =>{
    const query='SELECT ID,post_author,post_date,post_date_gmt,post_content,post_title,post_status,post_type FROM ds_posts';
    try {
        const conn = await getConn();
        const result = await conn.query(query);
        return res.json(result);
    } catch (error) {
        res.send(error.message);
    }
};

export const methods = {
    getPosts
};