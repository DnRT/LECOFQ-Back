import {getConn} from '../database/database';

const fs=require('fs');

function createJSON(name,content){
    var arch=fs.writeFile(name+".json", content,(err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("JSON Created");
        }
    });
}

const getPosts = async (req,res) =>{
    const query='SELECT ID,post_author,post_date,post_date_gmt,post_content,post_title,post_status,post_type FROM ds_posts';
    try {
        const conn = await getConn();
        const result = await conn.query(query);
        createJSON('all_news',JSON.stringify(result));
        return res.json(result);
    } catch (error) {
        res.send(error.message);
    }
};

const getPost= async (req,res)=>{
    const { id }=req.params;
    const query='SELECT ID,post_author,post_date,post_date_gmt,post_content,post_title,post_status,post_type FROM ds_posts WHERE id=?';
    try {
        const conn = await getConn();
        const result = await conn.query(query,id);
        createJSON('new_id_'+id,JSON.stringify(result));
        return res.json(result);
    } catch (error) {
        res.send(error.message);
    }
};

export const methods = {
    getPosts,
    getPost
};