$ curl wttr.in/Detroit?format=j1

let weather = {
apiKeys:"1c9bc452c1f1e7811c0d912717f0c77b",
fetchWeather:function(){
    fetch(`https://wttr.in/${city}?format=j1`).then(response => {

        return response.json()
        console.log(json)
    }).then(json => {
        fillWeatherBox(json, city)
    })
}
}