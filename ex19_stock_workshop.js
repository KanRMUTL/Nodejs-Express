var express = require('express')
var formidable = require('formidable')
var path = require('path')
var fs = require('fs')
var sqlite3 = require('sqlite3')

var app = express()
var basePath = path.join(__dirname, '/stock')

app.set('view engine', 'ejs')
app.set('views', './stock')
app.use(express.static(basePath))

app.get('/', function (req, res) {
    queryData(function (result) {
        res.render('index', {
            header: 'Stock Workshop',
            products: result
        })
    })

})


app.get('/add', function (req, res) {
    res.render('add', {
        header: 'Create Product'
    })
});

app.get('/edit', function (req, res) {
    queryById(req.query.id, function (row) {
        res.render('edit', {
            header: 'Edit Product',
            item: row
        })
    })

})

app.post('/api/add', function (req, res) {
    try {
        var form = new formidable.IncomingForm();
        var newName = Date.now();
        form.parse(req, function (err, fields, files) {
            var oldPath = files.fileupload.path;
            var fileName = newName.toString() + "." + files.fileupload.name.split('.').pop();
            var newPath = path.join(__dirname, './stock/img/' + fileName)

            fs.rename(oldPath, newPath, function (error) {
                if (error) throw error;
            })

            var data = {
                title: fields.title,
                description: fields.description,
                price: fields.price,
                stock: fields.stock,
                image: fileName
            };

            console.log('data : ', data)

            insertData(data)
            res.redirect('/')
        })
    } catch (error) {
        console.log('Err: ', +error)
        res.json(error)
    }
})

app.post('/api/update', function (req, res) {
    try {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            if (files.fileupload.size != 0) {
                var oldpath = files.fileupload.path
                var newpath = path.join(__dirname, './stock/img/' + fields.image)

                fs.rename(oldpath, newpath, function (err) {
                    if (err) throw error;
                    console.log('Update file successfully')
                })

            }
            var data = {
                id: fields.id,
                title: fields.title,
                description: fields.description,
                price: fields.price,
                stock: fields.stock,
            };

            console.log(JSON.stringify(data))
            updateData(data)
            res.redirect('/')
        })
    } catch (error) {
        throw error
    }
})

app.get('/api/delete', function (req, res) {
    deleteData(req.query.id, function(){
        res.redirect('/')
    })
})

app.use(function(req, res, error){
    console.log('error: ' + JSON.stringify(error))
    res.sendFile(path.join(__dirname, './stock/404.html'))
})

function queryById(id, callback) {
    let db = openDB();
    db.get('SELECT * FROM stock where id=?', [id], (error, row) => {
        if (error) {
            throw error;
        }
        callback(row)
    })
    closeDB(db)
}

function queryData(callback) {
    let db = openDB()
    const sql = "SELECT * FROM stock ORDER BY id"
    db.all(sql, function (error, rows) {
        if (error) {
            return callback([])
        } else {
            callback(rows)
        }
    })
    closeDB(db)
}

function insertData(data) {
    let db = openDB()
    const sql = `
        INSERT INTO stock(title,description,price,stock,image)
        VALUES(
            '${data.title}',
            '${data.description}',
            '${data.price}',
            '${data.stock}',
            '${data.image}'
        )
    `
    console.log(sql)
    db.run(sql)
    closeDB(db)
}

function updateData(data) {
    let db = openDB()
    const sql = `
        UPDATE stock SET
        title = '${data.title}',
        description = '${data.description}',
        price = '${data.price}',
        stock = '${data.stock}'
        WHERE id = '${data.id}'
    `

    console.log(sql)

    db.run(sql)

    closeDB(db)
}

function deleteData(id, callback){
    let db = openDB()
    const sql = `DELETE FROM stock WHERE id = '${id}'`
    db.run(sql, function (error) {
        if(error) throw error
        callback()
    })
}
function openDB() {
    let db = new sqlite3.Database(path.join(__dirname, '/stock/database/data.db'), (error) => {
        if (error) {
            console.error(error.message)
        } else {
            console.log('Connected to the stock database')
        }
    })

    var sql_create_table = `CREATE TABLE IF NOT EXISTS 'stock' (
            'id' INTEGER PRIMARY KEY AUTOINCREMENT,
            'title' TEXT,
            'description' TEXT,
            'price' INTEGER,
            'stock' INTEGER,
            'image' TEXT
        )`
    db.run(sql_create_table)
    return db;
}

function closeDB(db) {
    db.close((error) => {
        if (error) {
            return console.error(err.message)
        }
    })
}


var server = app.listen(3000, function () {
    console.log('server is running on localhost:3000')
})