const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')

// messageOne.textContent = "from javascript"

const getForecast = (url) =>{
    fetch(url).then((response) =>{
        response.json().then((data) =>{
           if(data.error){
               messageOne.textContent = (data.error)
               messageTwo.textContent = ""
           }
           else{
               messageOne.textContent = "Uw locatie: " + data.location
               messageTwo.textContent = "Het weer: " + data.forecast
               messageFive.textContent = "De temperatuur: " + data.temperature + " Graden"
               messageFour.textContent = "De gevoelstempratuur is: " + data.feelTemperature + " Graden"
               messageThree.textContent = "De luchtvochtigheid is: " + data.humidity + "%"
           }
       })
    })
}


weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    messageOne.textContent = "loading...."
    const location = search.value
    const url = ('/weather?search=' + location)
    getForecast(url)
})
