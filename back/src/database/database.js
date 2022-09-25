import mysql from 'promise-mysql';
import config from '../config';

const conn=mysql.createConnection({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password
});
const getConn=()=>{
    return conn;
};

module.exports = {
    getConn
};