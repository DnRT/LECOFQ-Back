import {getConn} from '../database/database';
const getPosts = async (req,res) =>{
    const query=`SELECT ds_posts.ID,ds_posts.post_date,ds_posts.post_date_gmt,ds_posts.post_content,
                ds_posts.post_title,ds_posts.post_status,ds_posts.post_type, ds_users.display_name
                FROM ds_posts INNER JOIN ds_users ON ds_posts.post_author=ds_users.ID 
                WHERE post_status = "publish" and post_type = "post" ORDER by (id) DESC LIMIT 50 `;
    try {
        const conn = await getConn();
        const result = await conn.query(query);
        result.forEach(element => {
            const cuerpo = element.post_content.toString();
            const myArray = cuerpo.replace('<figure class="wp-block-video"><video controls src="', "VIDEO: ");
            const myArray1 = myArray.replace('<img src="', "IMAGEN: ");
            const idql = parseInt(element.ID);
            const idmas1 = idql + 1;
            const stringql = 'alt="" class="wp-image-'+ idmas1 + '"/>';
            const myArray2 = myArray1.replace(stringql, "");
            const myArray3 = myArray2.replace(/<!--(.*?)-->/gm, "");
            const myArray4 = myArray3.replaceAll(/<(.|\n)*?>/gm, "");
            const myArray5 = myArray4.replace('"></video></figure>', "");
            const myArray6 = myArray5.replace('">', "");
            const myArray7 = myArray6.replaceAll(/\n\n\n\n/gm, '\n');
            const myArray8 = myArray7.replaceAll('\n', ' ');
            const myArray9 = myArray8.replaceAll(/\"/gm, '');
            const myArray10 = myArray9.replace('.jpg"', '.jpg');
            if(myArray10.includes('IMAGEN: ')){
                const myArray11 = myArray10.split('IMAGEN: ');
                const myArray12 = myArray11[1].split(' ');
                element.imagen = myArray12[0];
                element.post_content = myArray11[0];
            }
            else if(myArray10.includes('VIDEO: ')){
                const myArray11 = myArray10.split('VIDEO: ');
                const myArray12 = myArray11[1].split(' ');
                element.video = myArray12[0];
                element.post_content = myArray11[0];
            }
            else{
                element.post_content=myArray10;
            }
        });
        return res.json(result);
    } catch (error) {
        res.send(error.message);
    }
};

const getPost= async (req,res)=>{
    const { id }=req.params;
    const query=`SELECT ds_posts.ID,ds_posts.post_date,ds_posts.post_date_gmt,ds_posts.post_content,
                ds_posts.post_title,ds_posts.post_status,ds_posts.post_type, ds_users.display_name
                FROM ds_posts INNER JOIN ds_users ON ds_posts.post_author=ds_users.ID WHERE ds_posts.ID=?`;
    try {
        const conn = await getConn();
        const result = await conn.query(query,id);
        const cuerpo = result[0].post_content.toString();
        const myArray = cuerpo.replace('<figure class="wp-block-video"><video controls src="', "VIDEO: ");
        const myArray1 = myArray.replace('<img src="', "IMAGEN: ");
        const idql = parseInt(result[0].ID);
        const idmas1 = idql + 1;
        const stringql = 'alt="" class="wp-image-'+ idmas1 + '"/>';
        const myArray2 = myArray1.replace(stringql, "");
        const myArray3 = myArray2.replace(/<!--(.*?)-->/gm, "");
        const myArray4 = myArray3.replaceAll(/<(.|\n)*?>/gm, "");
        const myArray5 = myArray4.replace('"></video></figure>', "");
        const myArray6 = myArray5.replace('">', "");
        const myArray7 = myArray6.replaceAll(/\n\n\n\n/gm, '\n');
        const myArray8 = myArray7.replaceAll('\n', ' ');
        const myArray9 = myArray8.replaceAll(/\"/gm, '');
        const myArray10 = myArray9.replace('.jpg"', '.jpg');
        if(myArray10.includes('IMAGEN: ')){
            const myArray11 = myArray10.split('IMAGEN: ');
            const myArray12 = myArray11[1].split(' ');
            result[0].imagen = myArray12[0];
            result[0].post_content = myArray11[0];
        }
        else if(myArray10.includes('VIDEO: ')){
            const myArray11 = myArray10.split('VIDEO: ');
            const myArray12 = myArray11[1].split(' ');
            result[0].video = myArray12[0];
            result[0].post_content = myArray11[0];
        }
        else{
            result[0].post_content=myArray10;
        }
        return res.json(result[0]);
    } catch (error) {
        res.send(error.message);
    }
};

export const methods = {
    getPosts,
    getPost
};