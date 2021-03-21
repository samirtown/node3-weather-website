const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) 

// Setup static directory to serve, hieruit haalt die de images en css
// en wat eventuele javascript
app.use(express.static(publicDirectoryPath))

//Render alle pages die je hebt, samen met objects die je kan gaan gebruiken voor handlebars
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Samir Fathi'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Samir Fathi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMe: 'Hier voor help',
        title: 'Help',
        name: 'Samir Fathi'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.search){
        //return hier zodat de code al stopt anders 2x send = error
        return res.send({
            error: 'No address has been given.'
        })
    }
    geocode(req.query.search, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            res.send({
                error
            })
        }else{
            forecast(latitude, longitude, (error, {forecast, temperature, feelTemperature} = {}) =>{
                if(error){
                    res.send({
                        error
                    })
                }else{
                    res.send({
                        forecast,
                        temperature,
                        feelTemperature,
                        location
                    })
                }
            })
        }
    })
    // res.send({
    //     forecast: 'Sunny and nice',
    //     location: 'Leiden',
    //     address: req.query.search
    // })
})

app.get('/help/*', (req, res) => {
    res.render('errorHandling',{
        error: 'Help article not found'
    })
})

app.get('/products',(req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

//Deze moet als laatste anders pakt die deze gelijk als en laat die de andere matching routes niet zien.
app.get('*', (req, res) =>{
    res.render('errorHandling',{
        title: '404',
        error: 'Page not found',
        name: 'Samir Fathi'
    })
})

app.listen(port, () =>{
    console.log('server is up on port ' + port)
})





// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Samir',
//         age: 21
//     },
//     {
//         name: 'Lauren',
//         age: 33
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>')
// }) 


// app.com
// app.com/help
// app.com/about