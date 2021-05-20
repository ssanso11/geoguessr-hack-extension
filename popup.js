// submit location in geoguessr
function guess_location(lat, lng, token) {
    console.log(lat, lng);
    const xhr = new XMLHttpRequest();
    // post url is going to be the current game url
    const post_url = "https://www.geoguessr.com/api/v3/games/" + token;
    xhr.open("POST", post_url)
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // send lat, lng, and game url token in request
    xhr.send(JSON.stringify({ "lng": lng, "lat": lat, "timedOut": false, "token": token }));
}

// open location in google maps
function open_map(lat, lng) {
    const url = "https://google.com/maps/place/" + lat + ", " + lng; // eventually pass in lat lng
    window.open(url);
    // console.log(lat);
    // console.log(lng);
}

// reload tab
function reloadTab() {
    chrome.tabs.query({ active: true }, function (tabs) {
        chrome.tabs.reload();
        // console.log("Reloading...")
    });
}

// submit location button
submitBtn.addEventListener("click", function () {
    reloadTab();
    setTimeout(() => {
        chrome.tabs.query({ active: true }, function (tabs) {
            const { id: tabId } = tabs[0].url;
            chrome.tabs.executeScript(tabId, { runAt: 'document_end', code: 'document.querySelectorAll("#__NEXT_DATA__")[0].text' }, function (result) {
                const json_next_data = JSON.parse(result[0]);
                const rounds = json_next_data.props.pageProps.game.rounds;
                // console.log(json_next_data.props.pageProps.game)
                const { lat, lng } = (rounds[rounds.length - 1]);
                const token = json_next_data.props.pageProps.game.token;
                console.log(token);
                guess_location(lat, lng, token);
            });
        });
    }, 800);
});

// open in maps button
openMapsBtn.addEventListener("click", function () {
    reloadTab();
    setTimeout(() => {
        chrome.tabs.query({ active: true }, function (tabs) {
            const { id: tabId } = tabs[0].url;
            chrome.tabs.executeScript(tabId, { runAt: 'document_end', code: 'document.querySelectorAll("#__NEXT_DATA__")[0].text' }, function (result) {
                const json_next_data = JSON.parse(result[0]);
                const rounds = json_next_data.props.pageProps.game.rounds;
                const { lat, lng } = (rounds[rounds.length - 1]);
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
