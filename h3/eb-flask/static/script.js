function loadJSON(url, func) {
    let jsonObj = "";
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4){
            if (xmlhttp.status === 200){
                try{
                    jsonObj = JSON.parse(xmlhttp.responseText);
                } catch (e){
                    alert("Json file parsing error!");
                }
                func(jsonObj);
            } else{
                alert("File not found!");
            }
        }
    };
    xmlhttp.onerror = function() {
        alert("File not found in err!");
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    return jsonObj;
}

function switchPage(dest) {
    if (dest !== pageStatus){
        let mainElement = document.getElementById('main');
        let searchElement = document.getElementById('search');
        let button1 = document.getElementsByClassName('up_button')[0];
        let button2 = document.getElementsByClassName('down_button')[0];
        if (dest === 'search'){
            mainElement.style.display = 'none';
            searchElement.style.display = 'inline-block';
            button1.id = 'inactive';
            button2.id = 'active';
        } else {
            mainElement.style.display = 'inline-block';
            searchElement.style.display = 'none';
            button2.id = 'inactive';
            button1.id = 'active';
        }
        pageStatus = dest;
    }
}

function addHeadlines(headlineJson, src, num) {
    const headlineSrc = headlineJson[src];
    let innerHTML = "";
    for (let i = 0; i < num; i++) {
        innerHTML += "<div class='"+ src +"_element' id='" + src + "_" + i + "'>";
        innerHTML += "<img src="+ headlineSrc[i]['urlToImage'] +" alt='slide'"+i+">";
        innerHTML += "<div class='text'>";
        innerHTML += "<h2>" + headlineSrc[i]['title'] + "</h2>";
        innerHTML += "<p>" + headlineSrc[i]['description'] + "</p></div>";
        innerHTML += "<a class='links' target='_blank' href='" + headlineSrc[i]['url'] + "'></a>";
        innerHTML += "</div>";
    }
    document.getElementById(src).innerHTML += innerHTML;
}

function getSource() {
    loadJSON("/source?category=" + document.getElementById('category').value, function (sourceJson) {
    let innerHTML = "<option value=\'all\'>all</option>";
    for (let i = 0; i < sourceJson['sources'].length; i++) {
        const oneSource = sourceJson['sources'][i];
        innerHTML += "<option value='"+Object.values(oneSource)[0]+"'>" + Object.keys(oneSource)[0]+"</option>";
    }
    document.getElementById('source').innerHTML = innerHTML;
    });
}

function getEveryDateFormat(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    if (month < 10){
        return "0" + month + "/" + day + "/" + year;
    }
    return month + "/" + day + "/" + year;
}

function getDateString(date){
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10)
        month = "0"+ month;
    let day = date.getDate();
    if (day < 10)
        day = "0" + day;
    return year + "-" + month + "-" + day;
}

function getDate() {
    const today = new Date();
    const aWeekFromToday = new Date(today - 1000*3600*24*7);

    document.getElementById('to').value = getDateString(today);
    // console.log(today);
    // console.log(getDateString(today));
    // console.log(document.getElementById('to').value);
    document.getElementById('from').value = getDateString(aWeekFromToday);
    // console.log(document.getElementById('from').value);
}

function showDetail(card) {
    // console.log(card);
    card.setAttribute('class', 'every_card_long');
}

function showShortDescription(card) {
    // console.log(card);
    card.setAttribute('class', 'every_card_short');
}

function showMore() {
    let button = document.getElementById('more_less_button');
    let cards = document.getElementById('search_result');
    if (button.value === "Show More") {
        button.value = "Show Less";
        for (let i = 0; i < cards.childNodes.length; i++) {
            cards.childNodes[i].removeAttribute('style');
        }
    } else {
        button.value = "Show More";
        for (let i = 5; i < cards.childNodes.length; i++) {
            cards.childNodes[i].setAttribute('style', 'display: none');
        }
        document.getElementById('more_less_button').removeAttribute('style');
    }
}

function clearSearch() {
    document.getElementById('keyword').value = "";
    document.getElementById('category').value = "all";
    getSource();
    document.getElementById('search_result').innerText = "";
    getDate();
    return false;
}

function showSearchResult(resultJson) {
    let results = resultJson['everything'];
    if (results.length === 0){
        document.getElementById("search_result").innerHTML = "No results"
        return;
    }
    let innerHTML = "";
    for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (i > 4) {
            innerHTML += "<div class='every_card_short' style='display: none'>";
        } else {
            innerHTML += "<div class='every_card_short'>";
        }
        innerHTML += `<img src='${result['urlToImage']}' height='250px'><div class='every_text'>`;
        innerHTML += `<h2 class='every_title'>${result['title']}</h2>`;
        innerHTML += `<div class='every_detail'><p><b>Author: </b>${result['author']}</p>`;
        innerHTML += `<p><b>Source: </b>${result['source']}</p><p><b>Date: </b>${getEveryDateFormat(result['date'])}</p><p>${result['description']}</p>`;
        innerHTML += `<a href='${result['link']}' target="_blank">See Original Post</a></div>`;
        innerHTML += `<p class='every_description'>${result['short']}</p>`;
        innerHTML += "</div><p class=\"show_click\" onclick=\"showDetail(this.parentNode)\" style='margin: 0'></p>" +
            "<p class='close_button' onclick='showShortDescription(this.parentNode)'>&times;</p></div>";
    }
    if (results.length >5 ){
        innerHTML += "<input id='more_less_button' type='button' value='Show More' onclick='showMore()'>";
    }
    document.getElementById("search_result").innerHTML = innerHTML;
}

function testFromTo(from, to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    if (fromDate.getTime() > toDate.getTime()){
        alert("Incorrect time");
        return false;
    }
    return true;
}

function doSearch(){
    const keyword = document.getElementById('keyword').value;
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const category = document.getElementById('category').value;
    const source = document.getElementById('source').value;
    console.log(keyword);
    console.log(from);
    console.log(to);
    console.log(category);
    console.log(source);

    if (!testFromTo(from, to)){
        return false;
    }

    function getResultJson(resultJson) {
        console.log(resultJson);
        if (resultJson['status']==='error'){
            alert(resultJson['message']);
        }
        showSearchResult(resultJson);
    }

    loadJSON("/search?keyword=" + keyword+"&from="+from+"&to="+to+"&category="+category+"&source="+source, getResultJson);
    return false;
}

let pageStatus = 'news';

function showMainPage() {

    loadJSON('/headlines', showMainPageHelper);
}

showMainPage();


function showMainPageHelper(headlineJson) {
    addHeadlines(headlineJson, 'slide', 5);
    addHeadlines(headlineJson, 'cnn', 4);
    addHeadlines(headlineJson, 'fox-news', 4);
    getSource();
    getDate();

    let displaySlideID = 0;
    document.getElementById('slide_' + displaySlideID).style.display = 'inline-block';
    const intervalID = setInterval(function () {
        document.getElementById('slide_' + displaySlideID).style.display = 'none';
        displaySlideID = (displaySlideID + 1) % 5;
        document.getElementById('slide_' + displaySlideID).style.display = 'inline-block';
        // console.log(displaySlideID);
    }, 3000);

    function rescale(freq, min = 15, max = 50) {
        const size_min = freq[freq.length - 1][1];
        const scale = (max - min) / (freq[0][1] - freq[freq.length - 1][1]);
        for (let i = 0; i < freq.length; i++) {
            freq[i][1] = Math.round(min + scale * (freq[i][1] - size_min));
        }
        return freq;
    }

    function getWords() {
        const freqWords = rescale(headlineJson['freq']);
        let myWords = [];
        for (let i = 0; i < freqWords.length; i++) {
            myWords.push({'word': freqWords[i][0], 'size': freqWords[i][1]});
        }
        return myWords;
    }

    const myWords = getWords();

    const layout = d3.layout.cloud()
        .size([350, 300])
        .words(myWords.map(function (d) {
            return {text: d.word, size: d.size, test: "haha"};
        }))
        .padding(5)
        .rotate(function () {
            return ~~(Math.random() * 2) * 90;
        })
        .font("Impact")
        .fontSize(function (d) {
            return d.size;
        })
        .on("end", draw);

    layout.start();

    function draw(words) {
        d3.select("#wordCloud").append("svg").style("background", "#f3f3f3")
            .attr("width", layout.size()[0])
            .attr("height", layout.size()[1])
            .append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function (d) {
                return d.size + "px";
            })
            .style("font-family", "Impact")
            .attr("text-anchor", "middle")
            .attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function (d) {
                return d.text;
            });
    }

}