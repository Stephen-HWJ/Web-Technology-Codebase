function loadJSON(url) {
    let jsonObj = "";
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        if (xmlhttp.readyState === 4){
            if (xmlhttp.status === 200){
                try{
                    jsonObj = JSON.parse(xmlhttp.responseText);
                } catch (e){
                    alert("Json file parsing error!");
                }
            } else{
                alert("File not found!");
            }
        }
    };
    xmlhttp.onerror = function() {
        alert("File not found!");
    };
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    return jsonObj;
}

const headlineJson = loadJSON('/headlines');

function addSlides() {
    const slidesJson = headlineJson['slides'];
    let innerHTML = "";
    for (let i = 0; i < slidesJson.length; i++) {
        innerHTML += "<div class='slide_element'>";
        innerHTML += "<img src="+ slidesJson[i]['urlToImage'] +" alt='slide'"+i+" height='300'>";
        innerHTML += "<div class='text'>";
        innerHTML += "<h2>" + slidesJson[i]['title'] + "</h2>";
        innerHTML += "<p>" + slidesJson[i]['description'] + "</p></div>";
        innerHTML += "<a class='links' target='_blank' href='" + slidesJson[i]['url'] + "'></a>";
        innerHTML += "</div>";
    }
    document.getElementById("slides").innerHTML += innerHTML;
}

function addCards(src) {
    const cardJson = headlineJson[src];
    let innerHTML = "";
    for (let i = 0; i < cardJson.length; i++) {
        innerHTML += "<div class='card_element'>";
        innerHTML += "<img src="+ cardJson[i]['urlToImage'] +" alt='slide'"+i+" height='150'>";
        innerHTML += "<h2>" + cardJson[i]['title'] + "</h2>";
        innerHTML += "<p>" + cardJson[i]['description'] + "</p>";
        innerHTML += "<a href='" + cardJson[i]['url'] + "'></a>";
        innerHTML += "</div>";
    }
    document.getElementById(src).innerHTML += innerHTML;
}

// addCards('cnn');
// addCards('fox-news');
addSlides();

function getWords() {
    const freqWords = headlineJson['freq'];
    let myWords = [];
    for (let i = 0; i < freqWords.length; i++){
        myWords.push({'word': freqWords[i][0], 'size': freqWords[i][1]*5});
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
      .style("font-size", function(d) { return d.size + "px"; })
      .style("font-family", "Impact")
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; });
}

