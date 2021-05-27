const btn_for_places = document.getElementById("btn_for_places");
const btn_close_search = document.getElementById("btn_close_search");
const icon_img_clima = document.getElementById("icon_img_clima");
const number_temperatura = document.getElementById("number_temperatura");
const btn_form_search = document.getElementById("btn_form_search");
const fragment = document.createDocumentFragment();
const info_clima = document.getElementById("info_clima");
const panel_search = document.getElementById("panel_search");
const section_clima_days = document.getElementById("section_clima_days");
const template_today = document.getElementById("template_today").content;
const template_next_days =document.getElementById("template_next_days").content;
const todays_Hightlights = document.getElementById("todays_Hightlights");
const progress = document.getElementById("progreso");
const template_outstanding = document.getElementById("template_outstanding").content;
const elementos=document.getElementById('contenedores elementores')

/*******aqui llamamos a nuestra funcion que hara el llamado a la api :S*/
btn_form_search.addEventListener("click", (e) => {
  e.preventDefault();
  GetDatosApis();
  Mostrar_SeccionPrincipal()
});

//const url='https://cors.bridged.cc/https://www.metaweather.com/api/location/search/?query=lima'

//********obeniendo codigo del pais desde la api :S */
const GetDatosApis = async () => {
  const input_search = document.getElementById("input_search").value;
  const getdatos = await fetch(`https://cors.bridged.cc/https://www.metaweather.com/api/location/search/?query=${input_search}`);
  const results = await getdatos.json();
  let woeid = results[0].woeid;
  GetInfoClima(woeid);
  console.log(woeid);
};

/********obteniendo datos de la ciuda de su clima :S */
const GetInfoClima = async (index) => {

  const getinfo = await fetch(`https://cors.bridged.cc/https://www.metaweather.com/api/location/${index}/`);
  const results2 = await getinfo.json();
  let valor1 = results2.consolidated_weather[0].weather_state_abbr;
  let valor2 = results2.consolidated_weather[1].weather_state_abbr;
  let valor3 = results2.consolidated_weather[2].weather_state_abbr;
  let valor4 = results2.consolidated_weather[3].weather_state_abbr;
  let valor5 = results2.consolidated_weather[4].weather_state_abbr;
  let valor6 = results2.consolidated_weather[5].weather_state_abbr;

  const ObjeDatos1 = {
    img1: `https://www.metaweather.com/static/img/weather/${valor1}.svg`,
    min_temp1: Math.round(results2.consolidated_weather[0].min_temp),
    city: results2.title,
    name_weather: results2.consolidated_weather[0].weather_state_name,
    applicable_date:results2.consolidated_weather[0].applicable_date
  };
  
  const ObjeDatos2 = {
    img2: `https://www.metaweather.com/static/img/weather/${valor2}.svg`,
    img3: `https://www.metaweather.com/static/img/weather/${valor3}.svg`,
    img4: `https://www.metaweather.com/static/img/weather/${valor4}.svg`,
    img5: `https://www.metaweather.com/static/img/weather/${valor5}.svg`,
    img6: `https://www.metaweather.com/static/img/weather/${valor6}.svg`,
    min_temp2: Math.round(results2.consolidated_weather[1].min_temp),
    min_temp3: Math.round(results2.consolidated_weather[2].min_temp),
    min_temp4: Math.round(results2.consolidated_weather[3].min_temp),
    min_temp5: Math.round(results2.consolidated_weather[4].min_temp),
    min_temp6: Math.round(results2.consolidated_weather[5].min_temp),
    wind_speed: Math.round(results2.consolidated_weather[0].wind_speed),
    wind_direction_compass: results2.consolidated_weather[0].wind_direction_compass,
    humidity: results2.consolidated_weather[0].humidity,
    visibility:results2.consolidated_weather[0].visibility,
    air_pressure:results2.consolidated_weather[0].air_pressure,
  };

  let value_humidity = ObjeDatos2.humidity;
  progress.style.width = `${value_humidity}%`;
  llenando_datos1(ObjeDatos1);
  llenando_datos2(ObjeDatos2);
};

/*****************llenando los datos del clima del dia actual :S******************** */
const llenando_datos1 = (index) => {
  info_clima.innerHTML = "";
  template_today.querySelector(".icon1").setAttribute("src", index.img1);
  template_today.querySelector(".txt_temperatura1").textContent =index.min_temp1;
  template_today.querySelector(".city").textContent = index.city;
  template_today.querySelector(".name_weather").textContent =index.name_weather;
  template_today.querySelector(".date").textContent =index.applicable_date;
  const clone = template_today.cloneNode(true);
  fragment.appendChild(clone);
  info_clima.appendChild(fragment);
};

/******llenando informacion del clima de los proximos dias :S */
const llenando_datos2 = (index) => {
  section_clima_days.innerHTML = "";
  todays_Hightlights.innerHTML = "";

  template_next_days.querySelector(".icon2").setAttribute("src", index.img2);
  template_next_days.querySelector(".icon3").setAttribute("src", index.img3);
  template_next_days.querySelector(".icon4").setAttribute("src", index.img4);
  template_next_days.querySelector(".icon5").setAttribute("src", index.img5);
  template_next_days.querySelector(".icon6").setAttribute("src", index.img6);
  template_next_days.querySelector(".txt_temperatura2").textContent =index.min_temp2;
  template_next_days.querySelector(".txt_temperatura3").textContent =index.min_temp3;
  template_next_days.querySelector(".txt_temperatura4").textContent =index.min_temp4;
  template_next_days.querySelector(".txt_temperatura5").textContent =index.min_temp5;
  template_next_days.querySelector(".txt_temperatura6").textContent =index.min_temp6;

  template_outstanding.querySelector(".number_wind").textContent =index.wind_speed;
  template_outstanding.querySelector(".text_wind").textContent =index.wind_direction_compass;
  template_outstanding.querySelector(".humidty_percentage").textContent =index.humidity;
  template_outstanding.querySelector('.wind_direction').textContent=index.wind_direction_compass
  template_outstanding.querySelector('.visibility').textContent=index.visibility.toFixed(1)
  template_outstanding.querySelector('.air_pressure').textContent=index.air_pressure

  const clone = template_next_days.cloneNode(true);
  const clone2 = template_outstanding.cloneNode(true);
  fragment.appendChild(clone);
  fragment.appendChild(clone2);
  section_clima_days.appendChild(fragment);
  todays_Hightlights.appendChild(fragment);
};

/***funcion para animar el termometro :S */
const bar_progress = (index) => {
  progress.style.width = `${index}%`;
};

/******ocultamos la seccion donde mostraremos los datos del clima del dia actual:S*****/
btn_for_places.addEventListener("click", () => {
  ocultar_section_search();
});


/****ocultamos la seccion de busqueda****/
btn_close_search.addEventListener("click", () => {
  Mostrar_SeccionPrincipal()
});

/**ocultamos la seccion donde mostraremos los datos del clima del dia actual**/
const ocultar_section_search = () => {
  if (panel_search.classList.contains("invisible")) {
    panel_search.classList.replace("invisible", "visible");
  }
};

/***ocultamos la seccion de la busqueda*/
const Mostrar_SeccionPrincipal = () => {
  if (panel_search.classList.contains("visible")) {
    panel_search.classList.replace("visible", "invisible");
  }
};
