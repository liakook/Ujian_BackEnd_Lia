const router = require('express').Router()
const controler = require('../3. controler/movieControler')


router.get('/connList' , controler.getConnList)

router.get('/movie/:idmovies' , controler.getMovies)

router.get('/categories/:idcategories' , controler.getCategories)

router.post('/addnewmovie' , controler.addNewMovie)

router.post('/addnewcategory' , controler.addNewCategory)

router.post('/addconnlist' , controler.addConnList)


module.exports = router