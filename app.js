const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const jsonwebtoken = require('jsonwebtoken')
const sqlite3 = require('sqlite3')

const app = express();
const port = 3001;

app.use(bodyParser.json())
app.use(cors())

const db = new sqlite3.Database('./db.db', (err) => {
    if (err) {
        return console.log(err);
    }
    return console.log('бд подключена');
})

function checkToken(token, res) {
    let id = 0;
    if (!token) {
        return res.status(500).json({message: 'Токен не предоставлен'})
    }

    jsonwebtoken.verify(token, 'secret', (err, row) => {
        if (err) {
            return res.status(500).json({message: 'Не получилось верифицировать'})
        }
        id = row.userId
    })
    return id
}

app.post('/register', (req, res) => {
    const {login, email, fio, phone, password} = req.body

    if (!login || !email || !fio || !phone || !password) {
        return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
    }

    db.get(`select * from user where login = ?`, [login], (err, row) => {
        if (err) {
            return res.status(500).json({message: err})
        }
        if (row) {
            return res.status(500).json({message: 'Такой пользователь уже существует'})
        }

        db.run('insert into user (login, email, fio, phone, password) values (?, ?, ?, ?, ?)', [login, email, fio, phone, password], function(err) {
            if (err) {
                return res.status(500).json({message: 'Не получилось создать пользователя'})
            }
            return res.status(200).json({message: 'Получилось создать пользователя!'})
        })
    })
})

app.post('/auth', (req, res) => {
    const {login, password} = req.body

    db.get(`select * from user where login = ?`, [login], (err, row) => {
        if (err) {
            return res.status(500).json({message: err})
        }
        if (!row) {
            return res.status(500).json({message: 'Такого пользователя не существует'})
        }
        if (password !== row.password) {
            return res.status(500).json({message: 'Неправильный пароль'})
        }

        const token = jsonwebtoken.sign({userId: row.id, name: row.email}, 'secret', {expiresIn: '1h'});
        res.json({token})
    })
})

app.post('/request', (req, res) => {
    const {login, name, value, adress} = req.body

    const id = checkToken(req.headers.authorization.split(' ')[1], res)

    if (id) {
        db.run(`insert into requests (login, name, value, adress, status) values (?, ?, ?, ?, ?)`, [login, name, value, adress, 'Новый заказ'], function(err) {
            if (err) {
                return res.status(500).json({message: err})
            }
            return res.status(200).json({message: 'Получилось создать заказ!'})
        })
    }
})

app.post('/request', (req, res) => {
    const {name, value, adress} = req.body

    const id = checkToken(req.headers.authorization.split(' ')[1], res)

    if (id) {
        db.run(`insert into requests (name, value, adress, status) values (?, ?, ?, ?)`, [name, value, adress, 'Новый заказ'], function(err) {
            if (err) {
                return res.status(500).json({message: err})
            }
            return res.status(200).json({message: 'Получилось создать заказ!'})
        })
    }
})

app.post('/requests', (req, res) => {
    const {login} = req.body

    const id = checkToken(req.headers.authorization.split(' ')[1], res)

    if (id !== 2) {
        db.all(`select * from requests where login = ?`, [login], (err, row) => {
            if (err) {
                return res.status(500).json({message: err})
            }
            return res.status(200).json({row})
        })
    } else {
        db.all(`select * from requests`, (err, row) => {
            if (err) {
                return res.status(500).json({message: err})
            }
            return res.status(200).json({row})
        })
    }
})

app.post('/all', (req, res) => {
    const {status, id} = req.body

    const idd = checkToken(req.headers.authorization.split(' ')[1], res)
    
    if (idd) {
        db.run(`update requests set status = ? where id = ?`, [status, id], function(err) {
            if (err) {
                return res.status(500).json({message: err})
            }
            return res.status(200).json({message: 'статус изменен'})
        })
    }
})


app.listen(port, () => {
    console.log(`Сервер запущен на порте http://localhost:${port}`);
})