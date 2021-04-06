window.addEventListener('load', getData);

async function getData() {
    const response = await fetch(`device/device_23/humidity`);
    const json = await response.json();
    const rows = json.map(row => [new Date(row.recorded_at), row.humidity]);
    console.log(rows[rows.length-1]);
    //var col = document.getElementById("body");
    if(rows[rows.length-1][1]==1){
        document.body.style.background = "red";
    }else if(rows[rows.length-1][1]==2){
        document.body.style.background = "blue";
    }else if(rows[rows.length-1][1]==3){
        document.body.style.background = "green";
    }else{
        document.body.style.background = "white";
    }
    console.log(document.body.style.background);
    //motivation
}

setInterval(getData,1000);