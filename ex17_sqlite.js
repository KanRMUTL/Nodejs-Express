var path = require('path')
var sqlite3 = require('sqlite3')

let db = new sqlite3.Database(path.join(__dirname, '/public/data.db'), (error) => {
    if (error) {
        console.log(error.message)
    }
    console.log("Connected to database")
})

db.serialize(() => {
    const sql_create_table = `
        CREATE TABLE IF NOT EXISTS 'stock'
        (
            'id' INTEGER PRIMARY KEY AUTOINCREMENT,
            'title' TEXT,
            'description' TEXT,
            'price' INTEGER,
            'status' TEXT
        )
    `

    const sql_insert_table = `
        INSERT INTO stock(title, description, price, status)
        VALUES(
            'Web design',
            'มาเรียนกันเถอะ',
            6000,
            'available'
        )
    `
    db.run(sql_create_table)
        .run(sql_insert_table)
        .each("SELECT * FROM stock", (err, row) => { // เรียกมาทีละแถว
            if (err) throw err
            console.log(row)
        })
        .get("SELECT * FROM stock", (err, row) => { // เรียกเฉพาะแถวแรก
            if (err) throw err
            console.log(row)
        })
        .all("SELECT * FROM stock WHERE id = 2", (err, rows) => { // เรียกมาทั้งหมดแล้วได้เป็น Array ออกมา
            if (err) throw err
            rows.forEach(row => {
                console.log(row)
            })
        })
})

db.close()