import mysql from 'mysql2'

const pool = mysql.createPool({
    host:'localhost',
    user: 'root',
    password : '1234',
    database : 'to_do_list'
}).promise();

export async function getPendingTask(status){
    const [rows] = await pool.query(`select * from todo where status = ?`,status)
    return rows;
}

export async function saveTask(item,seq){
    const resultSet = await pool.query("insert into todo (item,sequence,status) value (?,?,?)",[item,seq,"pending"])
    return true;
}

export async function updateAsDone(id){
    const resultSet = await pool.query("update todo set status = ? where id=?","done",id)
    console.log(resultSet);
}

export async function removeItem(ID){
    const resultSet = await pool.query("delete from todo where id=?",id)
    console.log(resultSet);
}





