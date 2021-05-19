// get lat and long data
// here
function open_map(lat, lng) {
    const url = "https://google.com/maps/place/" + lat + ", " + lng; // eventually pass in lat lng
    //window.open(url);
    console.log(lat);
    console.log(lng);
}

// open in maps button
openMapsBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true }, function (tabs) {
        chrome.tabs.reload();
        console.log("waiting...")
    });
    setTimeout(() => {
        chrome.tabs.query({ active: true }, function (tabs) {
            const { id: tabId } = tabs[0].url;
            chrome.tabs.executeScript(tabId, { runAt: 'document_end', code: 'document.querySelectorAll("#__NEXT_DATA__")[0].text' }, function (result) {
                const json_next_data = JSON.parse(result[0]);
                const rounds = json_next_data.props.pageProps.game.rounds;
                console.log(rounds);
                const thisRound = rounds[rounds.length - 1];
                const { lat, lng } = thisRound;
                open_map(lat, lng);
            });
        });
    }, 800);
});

// refreshPageBtn.addEventListener("click", function () {
//     chrome.tabs.query({ active: true }, function (tabs) {
//         chrome.tabs.reload();

//     });
// });
