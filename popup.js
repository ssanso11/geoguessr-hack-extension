// get lat and long data
// here

// open in maps button
const openMapsBtn = document.getElementById("openMapsBtn");
openMapsBtn.addEventListener("click", function () {
    const url = "https://google.com/maps/place/";// + lat + "," + lng;
    window.open(url);
});
