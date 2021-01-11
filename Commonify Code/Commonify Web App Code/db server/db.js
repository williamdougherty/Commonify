const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Watup202!',
    database: 'commonify'
});

connection.connect(err =>{
    if(err){
        return err;
    }
})

console.log(connection);
app.use(cors());

app.get('/longterm', (req,res) =>{
    const { user_id } = req.query;
    const GET_LONG_TERM_SONGS = `SELECT * FROM long_term WHERE user_id = '${user_id}'`;
    connection.query(GET_LONG_TERM_SONGS, (err, results) =>{
        if(err){
            return res.send(err)
        }
        else{
            return res.json({
                songs: results
            })
        }
    });
});

app.get('/mediumterm', (req,res) =>{
    const { user_id } = req.query;
    const GET_MEDIUM_TERM_SONGS = `SELECT * FROM medium_term WHERE user_id = '${user_id}'`;
    connection.query(GET_MEDIUM_TERM_SONGS, (err, results) =>{
        if(err){
            return res.send(err)
        }
        else{
            return res.json({
                songs: results
            })
        }
    });
});

app.get('/shortterm', (req,res) =>{
    const { user_id } = req.query;
    const GET_SHORT_TERM_SONGS = `SELECT * FROM short_term WHERE user_id = '${user_id}'`;
    connection.query(GET_SHORT_TERM_SONGS, (err, results) =>{
        if(err){
            return res.send(err)
        }
        else{
            return res.json({
                songs: results
            })
        }
    });
});

app.get('/longterm/add', (req,res) => {
    const { user_id, title, artist } = req.query;
    const INSERT_LONG_TERM_SONG = `INSERT INTO long_term (user_id, title, artist) VALUES('${user_id}', '${title}', '${artist}')`;
    connection.query(INSERT_LONG_TERM_SONG, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            res.send('')
        }
    });
});

app.get('/mediumterm/add', (req,res) => {
    const { user_id, title, artist } = req.query;
    const INSERT_MEDIUM_TERM_SONG = `INSERT INTO medium_term (user_id, title, artist) VALUES('${user_id}', '${title}', '${artist}')`;
    connection.query(INSERT_MEDIUM_TERM_SONG, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            res.send('')
        }
    });
});

app.get('/shortterm/add', (req,res) => {
    const { user_id, title, artist } = req.query;
    const INSERT_SHORT_TERM_SONG = `INSERT INTO short_term (user_id, title, artist) VALUES('${user_id}', '${title}', '${artist}')`;
    connection.query(INSERT_SHORT_TERM_SONG, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            res.send('')
        }
    });
});

app.get('/shortterm/delete', (req,res) => {
    const { user_id } = req.query;
    const DELETE_SHORT_TERM_USER = `DELETE FROM short_term WHERE user_id='${user_id}'`;
    connection.query(DELETE_SHORT_TERM_USER, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            res.send('')
        }
    });
});

app.get('/mediumterm/delete', (req,res) => {
    const { user_id } = req.query;
    const DELETE_MEDIUM_TERM_USER = `DELETE FROM medium_term WHERE user_id='${user_id}'`;
    connection.query(DELETE_MEDIUM_TERM_USER, (err, results) => {
        if(err){
            return res.send(err)
        }
    });
});

app.get('/longterm/delete', (req,res) => {
    const { user_id } = req.query;
    const DELETE_LONG_TERM_USER = `DELETE FROM long_term WHERE user_id='${user_id}'`;
    connection.query(DELETE_LONG_TERM_USER, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            res.send('')
        }
    });
});

app.get('/mediumterm/update', (req,res) => {
    const { user_id, title, artist, num } = req.query;
    const UPDATE_MEDIUM_TERM_SONGS = `UPDATE medium_term SET title = '${title}', artist = '${artist}' WHERE user_id='${user_id}' AND num = '${num}'`;
    connection.query(UPDATE_MEDIUM_TERM_SONGS, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            res.send('')
        }
    });
});

app.get('/shortterm/update', (req,res) => {
    const { user_id, title, artist, num } = req.query;
    const UPDATE_SHORT_TERM_SONGS = `UPDATE short_term SET title = '${title}', artist = '${artist}' WHERE user_id='${user_id}' AND num = '${num}'`;
    connection.query(UPDATE_SHORT_TERM_SONGS, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            res.send('')
        }
    });
});

app.get('/longterm/update', (req,res) => {
    const { user_id, title, artist, num } = req.query;
    const UPDATE_LONG_TERM_SONGS = `UPDATE long_term SET title = '${title}', artist = '${artist}' WHERE user_id='${user_id}' AND num = '${num}'`;
    connection.query(UPDATE_LONG_TERM_SONGS, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            res.send('')
        }
    });
});

app.get('/longterm/compare', (req,res) => {
    const { user_id1, user_id2 } = req.query;
    const COMPARE_LONG_TERM_SONGS = `select title, artist FROM (select title, artist from long_term WHERE user_id='${user_id1}' UNION ALL select title, artist from long_term WHERE user_id='${user_id2}') sub group by title, artist having count(title) > 1`;
    connection.query(COMPARE_LONG_TERM_SONGS, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            return res.json({
                songs: results
            })
        }
    });
});

app.get('/mediumterm/compare', (req,res) => {
    const { user_id1, user_id2 } = req.query;
    const COMPARE_MEDIUM_TERM_SONGS = `select title, artist FROM (select title, artist from medium_term WHERE user_id='${user_id1}' UNION ALL select title, artist from medium_term WHERE user_id='${user_id2}') sub group by title, artist having count(title) > 1`;
    connection.query(COMPARE_MEDIUM_TERM_SONGS, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            return res.json({
                songs: results
            })
        }
    });
});

app.get('/shortterm/compare', (req,res) => {
    const { user_id1, user_id2 } = req.query;
    const COMPARE_SHORT_TERM_SONGS = `select title, artist FROM (select title, artist from short_term WHERE user_id='${user_id1}' UNION ALL select title, artist from short_term WHERE user_id='${user_id2}') sub group by title, artist having count(title) > 1`;
    connection.query(COMPARE_SHORT_TERM_SONGS, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            return res.json({
                songs: results
            })
        }
    });
});

app.listen(4000, () =>{
    console.log('db server listening on port 4000')
})