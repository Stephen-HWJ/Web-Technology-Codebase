const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
app.use(cors());

const guardian_api = "https://content.guardianapis.com/";
const guardian_key = "9ee2a116-fe34-40b3-a5af-fbbf20724bd4";
const guardian_img = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";

const nyt_api = "https://api.nytimes.com/svc/topstories/v2/";
const nyt_key = ".json?api-key=jbCOd2UUEnht6m84577J7N59NPj8MwT7";https://api.nytimes.com/svc/topstories/v2/world.json?api-key=jbCOd2UUEnht6m84577J7N59NPj8MwT7

function guardianDataProcess(data) {
	if (data.response.status === "error") {
		return {"returnArray": data};
	} 
	let resultsArray = data.response.results;
	let returnArray = [];
	for (var i = 0; i < resultsArray.length; i++) {
		result = {"title": resultsArray[i].webTitle};
		// console.log(resultsArray[i].blocks.main.elements[0].assets.length);
		if (!resultsArray[i].blocks.main || !resultsArray[i].blocks.main.elements || !resultsArray[i].blocks.main.elements[0].assets || resultsArray[i].blocks.main.elements[0].assets.length===0) {
			result["image"] = guardian_img;
		} else {
			result["image"] = resultsArray[i].blocks.main.elements[0].assets[resultsArray[i].blocks.main.elements[0].assets.length-1].file;
		}
		// result["image"] = resultsArray[i].blocks.main.elements[0].assests.length>0 ? resultsArray[i].blocks.main.elements[0].assests[length-1] : guardian_img;
		result["section"] = resultsArray[i].sectionId;
		result["date"] = resultsArray[i].webPublicationDate;
		result["description"] = resultsArray[i].blocks.body[0].bodyTextSummary;
		returnArray.push(result);
		console.log(result)
	}
	return {"returnArray": returnArray.slice(0, 10)};
}

function nytDataProcess(data) {
	var returnArray = [];
	if (data.status != 'OK'){
		return {"err": data};
	} else {
		var results = data.results;
		for (var i = 0; i < results.length; i++) {
			var result = results[i];
			var rData = {"title": result.title};
			if (!result.multimedia || result.multimedia.length == 0 || result.multimedia[0].width < 200){
				rData["image"] = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
			} else {
				rData["image"] = result.multimedia[0].url;
			}
			rData["section"] = result.section;
			rData["date"] = result.published_date;
			rData["description"] = result.abstract;
			returnArray.push(rData);
			console.log(rData);
		}
	}

	return {"returnArray": returnArray.slice(0, 10)};
}

app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});

app.get('/api/:param1/and/:param2', (req, res) => {
  res.send(req.params);
});

app.get('/guardian/:section', (req, res) => {
	let api_url = guardian_api;
	if (req.params.section === "home") {
		api_url += "search?api-key="+guardian_key+"&section=(sport|business|technology|politics)&show-blocks=all";
	} else {
		api_url += req.params.section + "?api-key="+guardian_key+"&show-blocks=all";
	}
	let res_data = "";

	console.log(api_url);
   fetch(api_url)
   .then(res => res.json())
   .then(data => {
      res.send(guardianDataProcess(data));
   })
   .catch(err => {
      res.send({'error': err});
   });

});

app.get('/nyt/:section', (req, res) => {
	let api_url = nyt_api + req.params.section + nyt_key;
	let res_data = "";

	console.log(api_url);
   fetch(api_url)
   .then(res => res.json())
   .then(data => {
      res.send(nytDataProcess(data));
   })
   .catch(err => {
      res.send({'error': err});
   });
});

app.get('/test/nyt', (req, res) => {
	console.log("https://nodejs-hwj.appspot.com/nyt/home");
   fetch("https://nodejs-hwj.appspot.com/nyt/home")
   .then(res => res.json())
   .then(data => {
      res.send(data);
   })
   .catch(err => {
      res.send({'error': err});
   });
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});


// https://content.guardianapis.com/search?api-key=9ee2a116-fe34-40b3-a5af-fbbf20724bd4&section=(sport|business|technology|politics)&show-blocks=all
