// burger and drop-down list code
const dropDownList = document.querySelector(".drop-down_list");
const burgerPlus = document.querySelector(".burger-plus");
const burgerPlusLi = document.querySelectorAll(".burger-plus li");

// появление/исчезание списка по клику
dropDownList.onclick = () => {
    dropDownList.classList.toggle("active");
    document.querySelector(".gorisontal").classList.toggle("active");
    document.querySelector(".vertical").classList.toggle("active");

    // убираем кликабельность курсора на время появления/исчезания списка
    const cursorNone = setTimeout(() => {
        dropDownList.style.pointerEvents = "none";
    });
    setTimeout(() => {
        clearTimeout(cursorNone);
        dropDownList.style.pointerEvents = "auto";
    }, 1100);

    // условие появления/исчезания списка
    let countList = 0;
    if (burgerPlus.hasAttribute("data-open") === false) {
        burgerPlus.setAttribute("data-open", "open");
        burgerPlus.style.display = "block";

        // появление списка
        const downList = setInterval(() => {
            if (countList != burgerPlusLi.length) {
                burgerPlusLi[countList].classList.toggle("active");
            } else {
                clearInterval(downList);
            }
            countList++;
        }, 200);
    } else {
        // исчезание списка
        countList = burgerPlusLi.length;
        downList = setInterval(() => {
            countList--;
            if (countList != -1) {
                burgerPlusLi[countList].classList.toggle("active");
            } else {
                clearInterval(downList);
                burgerPlus.removeAttribute("data-open");
                burgerPlus.style.display = "none";
            }
        }, 200);
    }
}

// получения прогноза погоды по клику на элемент списка
const cardWeather = document.querySelectorAll(".card-weather li");
let id;
for (let i = 0; i < burgerPlusLi.length; i++) {
    burgerPlusLi[i].onclick = () => {
        id = burgerPlusLi[i].getAttribute("data-cityid");

        fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=YourOpenWeatherKey`)
            .then(function (resp) {
                return resp.json()
            })

            .then(function (data) {
                cardWeather[0].textContent = data.name;
                cardWeather[1].textContent = data.sys.country;
                cardWeather[2].innerHTML = Math.round(data.main.temp - 273) + "&deg;";
                cardWeather[3].textContent = data.weather[0].description;
                cardWeather[4].style.transform = `rotate(${data.wind.deg}deg)`;
                cardWeather[5].textContent = data.wind.speed + " m/s";
                cardWeather[6].innerHTML = `Humidity ${data.main.humidity}&percnt;`;
                cardWeather[7].innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
                // document.querySelector(".btn-update").onclick = function () {
                //     document.location.reload();
                // }
            })
    }
}