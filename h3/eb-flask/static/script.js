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

function addHeadlines(src, num) {
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
    const sourceJson = loadJSON("/source?category=" + document.getElementById('category').value);
    let innerHTML = "<option value=\'all\'>all</option>";
    for (let i = 0; i < sourceJson['sources'].length; i++) {
        const oneSource = sourceJson['sources'][i];
        innerHTML += "<option value='"+Object.values(oneSource)[0]+"'>" + Object.keys(oneSource)[0]+"</option>";
    }
    document.getElementById('source').innerHTML = innerHTML;
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
    const resultJson = loadJSON("/search?keyword=" + keyword+"&from="+from+"&to="+to+"&category="+category+"&source="+source);
    console.log(resultJson);
    return false;
}

let pageStatus = 'news';
const headlineJson = loadJSON('/headlines');

addHeadlines('slide', 5);
addHeadlines('cnn', 4);
addHeadlines('fox-news', 4);
getSource();


let displaySlideID = 0;
document.getElementById('slide_'+displaySlideID).style.display = 'inline-block';
const intervalID = setInterval(function () {
    document.getElementById('slide_'+displaySlideID).style.display = 'none';
    displaySlideID = (displaySlideID + 1) % 5;
    document.getElementById('slide_'+displaySlideID).style.display = 'inline-block';
    // console.log(displaySlideID);
}, 3000);

function getWords() {
    const freqWords = headlineJson['freq'];
    let myWords = [];
    for (let i = 0; i < freqWords.length; i++){
        myWords.push({'word': freqWords[i][0], 'size': freqWords[i][1]*6});
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

