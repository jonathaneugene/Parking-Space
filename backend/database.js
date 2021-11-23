console.log(process.env.REACT_APP_DB_HOST);
const database_app = require('pg').Pool
const database_cred = new database_app({
    host : process.env.REACT_APP_DB_HOST,
    database : process.env.REACT_APP_DB_DATABASE,
    user : process.env.REACT_APP_DB_USER,
    port: 5432,
    password : process.env.REACT_APP_DB_PASSWORD,
    ssl : {
        require:true,
        rejectUnauthorized:false
    },
    uri: process.env.REACT_APP_DB_URI
});


const parking_lots = (request,response) => {
    database_cred.query('SELECT * FROM parkinglots', (error,results) =>
    {
        if (error){
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

const store_user_data = (data, cb,uid) =>{
    console.log(data,uid)
    database_cred.query('INSERT INTO users(email,firstname,lastname,phonenumber,userid) VALUES($1,$2,$3,$4,$5)',[data['email'], data['firstName'],data['lastName'],data['phoneNumber'], uid],(error) =>{
        if(error){
            throw error;
        }
    })
}

const get_user_data = (request,response,uid) =>{
    database_cred.query('SELECT * FROM users WHERE userid = $1',[uid],(error, results) => {
        if (error){
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

const get_user_schedule = (request,response) => {
    const emailID = "prasoonn@buffalo.edu";
    database_cred.query('SELECT * FROM schedules WHERE email = $1',[emailID],(error,results) => {
        if(error){
            throw error;
        }
        response.status(200).json(results.rows)
    })
}

const update_user_data = (data, cb, uid) =>{
    database_cred.query('UPDATE users SET firstname = $1, lastname = $2, phonenumber = $3 WHERE userid = $4', [data['firstName'],data['lastName'], data['phoneNumber'], uid], (error) =>{
        if(error){
            throw error;
        }
    })
}

module.exports = {
    parking_lots,
    get_user_data,
    get_user_schedule,
    store_user_data,
    update_user_data
}