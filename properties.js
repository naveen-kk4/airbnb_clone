const baseUrl = "https://airbnb13.p.rapidapi.com/search-location?";
const properties = document.getElementsByClassName("all-properties")[0];
let checkIn;
let checkOut;
let guests;
let destination;
if(localStorage.getItem("idx")==null)localStorage.setItem("idx",0);
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '02580bbef3msh80abc96a41b82d2p162b8ejsn78598ae3f1d0',
		'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
	}
};

window.onload = assignValues;

function assignValues(){
    checkIn=localStorage.getItem("checkIn");
    checkOut=localStorage.getItem("checkOut");
    guests=localStorage.getItem("guests");
    destination=localStorage.getItem("destination");
    showTitle();
    fetchResults();
}
function showTitle(){
    document.getElementById("destination").innerHTML=destination;
    document.getElementById("totalGuests").innerHTML=`${guests} Guests`;
    let checkInDate = new Date(checkIn);
    let checkOutDate = new Date(checkOut);
    document.getElementById("dates").innerHTML=`${getMonth(checkInDate.getMonth())} ${checkInDate.getDate()} - ${getMonth(checkOutDate.getMonth())} ${checkOutDate.getDate()}`
    
}

async function fetchResults(){
    const endpoint = `${baseUrl}location=${destination}&checkin=${checkIn}&checkout=${checkOut}&adults=${guests}&currency=USD&pages=1;`
    try {
        const response = await fetch(endpoint, options);
        const result = await response.json();
        renderDetails(result.results);
    } catch (error) {
        console.error(error);
    }
}

function renderDetails(arr){
    let element1 = document.createElement("div");
    element1.classList.add("container");
    element1.classList.add("text-muted");
    element1.innerHTML=`200+ stays in ${destination}`;
    properties.appendChild(element1);
    let str = localStorage.getItem("idx");
    let num = (Number)(str);
   for(let i = num;i<Math.min(num+10,arr.length);i++){
      const curr = arr[i];
      const curr_property = document.createElement("div");
      curr_property.classList.add('property-card', 'd-flex' ,'justify-content-between', 'container', 'my-3', 'py-4');
      curr_property.innerHTML=` <div class="property-img"><img src=${curr.images[0]} alt=""></div>
      <div class="d-flex justify-content-between flex-column">
          <div class="d-flex justify-content-between">
              <div><span class="text-muted" style="font-size: 13px;">${curr.type}</span><br><span class="fw-bold fs-6">${curr.name}</span></div>
              <div><img class="heart" onclick="changeHeart(this)" src="./assets/heart.svg" alt=""></div>
          </div>
          <div id="${i}" class="text-muted" class="amenties">
             
          </div>
          <div class="d-flex justify-content-between">
              <div style="font-size: 14px;">${curr.rating}<img src="./assets/star.svg" alt="">(${curr.reviewsCount}reviews)</div>
              <div ><span class="fw-bold">$${curr.price.rate}USD </span><span>/night</span></div>
          </div>

      </div>`
      properties.appendChild(curr_property);
      loadAmenties(i,curr);
   }
   
   pagenation(arr);

  

}

function loadAmenties(idx,arr){
    const element = document.getElementById(idx);
    
    const pElement = document.createElement("p");
    arr.previewAmenities.forEach(element => {
         pElement.innerHTML+=element+" • ";
    });
    if(pElement.innerHTML != "")pElement.innerHTML=pElement.innerHTML.substring(0,pElement.innerHTML.length-3)
    element.appendChild(pElement);
}
function pagenation(arr){
    let str = localStorage.getItem("idx");
    let num = (Number)(str);
    const buttons = document.createElement("div");
    if(num>0){
        const buttonEle = document.createElement("button");
        buttonEle.innerHTML="prev";
        buttonEle.classList.add("button-29");
        buttons.appendChild(buttonEle);
        buttonEle.addEventListener("click",()=>{
            localStorage.setItem("idx",num-10);
            location.reload();
        });

    }
   if(num+10 < arr.length){
    const buttonEle = document.createElement("button");
    buttonEle.innerHTML="next";
    buttonEle.classList.add("button-29");
    buttons.appendChild(buttonEle);
    buttonEle.addEventListener("click",()=>{
        localStorage.setItem("idx",num+10);
        location.reload();
    });
   }
   properties.appendChild(buttons);
  
}

function changeHeart(element){
    if(element.src==="http://127.0.0.1:5500/assets/heart.svg")element.src="http://127.0.0.1:5500/assets/likeheart.svg"
    else element.src="http://127.0.0.1:5500/assets/heart.svg";
}

function getMonth(monthNum){

    switch(monthNum){
        case 0:return "Jan";
        case 1:return "Feb";
        case 2:return "Mar";
        case 3:return "Apr";
        case 4:return "May";
        case 5:return "Jun";
        case 6:return "July";
        case 7:return "Aug";
        case 8:return "Sep";
        case 9:return "Oct";
        case 10:return "Nov";
        default:return "Dec";
    }

}