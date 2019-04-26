const db = require('../1. database/index')


module.exports = {
    getConnList : (req,res) => {
        // pake petik ES6 supaya bisa di enter!
        db.query(`select nama as 'Nama Movie', c.nama_category as 'Nama Category' 
                from movcat as mc
                join movies m on id_movie = m.id 
                join categories c on id_category = c.id`, (err,result) => {
                    if(err) throw err
                    if(result){
                        res.send(result)
                    }
                })
    },
    getMovies : (req,res) => {
        db.query(`select nama as "Nama Movie", c.nama_category as "Nama Category" 
                from movcat as mc 
                join categories c on id_category = c.id
                join movies m on id_movie = m.id where m.id = ${req.params.idmovies}`, (err,result) => {
                    if(err) throw err
                    if(result){
                        res.send(result)
                    }
                })
    },

    getCategories : (req,res) => {
        db.query(`select nama_category as "Nama Category" from movcat as mc
                join categories c on id_category = c.id
                where c.id = ${req.params.idcategories}`, (err,result) => {
                    if(err) throw err
                    if(result){
                        res.send(result)
                    }
                })
    },
 
    addNewMovie : (req,res) => {
        var dataMovie = {
            nama : req.body.nama,
            tahun : req.body.tahun,
            description : req.body.description
        }
        var categories = req.body.categories
        db.query('insert into movies set ?' , dataMovie , (err,result) => {
            if(err) throw err
            db.query(`select id from movies where nama = '${dataMovie.nama}'` , (err,result1) => {
                if(err) throw err
                db.query(`insert into movcat set ?`, 
                // pake result1[0] karena result1 adl hasil dr select yg berisi nama bukan primary key,
                // untuk result1[0].id -> .id krn select di atas pake id!
                {id_movie : result1[0].id , id_category : categories},
                (err,result2) =>{
                    if(err) throw err
                  
                    res.redirect('/api/connList')
                })
            })
        })
    },

    addNewCategory : (req,res) => {
        var dataCategories = {nama_category : req.body.nama_category}
        db.query('insert into categories set ?' , dataCategories , (err,result) => {
            if(err) throw err
            db.query(`select id from categories where nama_category = '${dataCategories.nama_category}'` , (err,result1) => {
                if(err) throw err
                db.query(`insert into movcat set ?`, 
                {id_category : result1[0].id},
                (err,result2) =>{
                    if(err) throw err
                    res.send('/api/addnewcategory')
                })
            })
        })
    },

    addConnList : (req,res) => {
        var dataConnList = {
            nama_movie : req.body.nama,
            nama_category : req.body.nama_category
        }
        db.query('insert into movies & categories set ?' , dataConnList , (err,result) => {
            if(err) throw err
            db.query(`select id from movies where nama = '${dataConnList.nama}'` , (err,result1) => {
                if(err) throw err
                db.query(`insert into movcat set ?`, 
                {id_category : result1[0].id},
                (err,result2) =>{
                    if(err) throw err
                    res.send('/api/addconnlist')
                })
            })
        })
    }
}

