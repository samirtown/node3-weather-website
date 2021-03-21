const request = require('postman-request')

//Weatherstack api
const forecast = (lat, long, callback) => {
    //latlong = lat.toString() + ',' + long.toString()
    const url = 'http://api.weatherstack.com/current?access_key=af1e2bc10f91965c1c462145fa6eb65e&query=' + lat + ',' + long + '&units=m'
    console.log(url)
    request({url, json: true }, (error, {body} = {}) => {
        if (error){
            callback('cannot connect', undefined)
        } else if(body.error){
            callback('unable to find location', undefined)
        } else{
            callback(undefined, {
                forecast: body.current.weather_descriptions[0],
                temperature: body.current.temperature, 
                feelTemperature:body.current.feelslike,
                humidity: body.current.humidity})
        }
    })
}

module.exports = forecast