// dbConnectPool    - 최종 수정 : 23/04/02 06:29 김지용 -

import mysql from 'mysql'
let instance = null;
import dotenv from 'dotenv'
dotenv.config()

class Database {
    constructor(){
        if(instance) return instance;
        instance = this;
        this.pool = mysql.createPool({
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_SCHEMA,
        })
    }
    getConnection(callback) {
        this.pool.getConnection(function (err, conn) {
            if(!err) {
                callback(conn);
            } else {
                // TODO 에러 발생시 db 재연결 시도하기.
                console.error('DB connection err');
                console.error(err);
                throw err;
            }
        });
    }
}

export default Database;