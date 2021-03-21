const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

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
           }
       })
    })
}


weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    messageOne.textContent = "loading...."
    const location = search.value
    const url = ('http://localhost:3000/weather?search=' + location)
    getForecast(url)
})
