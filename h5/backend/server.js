const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
app.use(cors());

const guardian_api = "https://content.guardianapis.com/";
const guardian_key = "9ee2a116-fe34-40b3-a5af-fbbf20724bd4";
const guardian_img = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
// https://content.guardianapis.com/search?order-by=newest&show-fields=starRating,headline,thumbnail,short-url&api-key=9ee2a116-fe34-40b3-a5af-fbbf20724bd4

function guardianDataProcess(data) {
	if (data.response.status === "error") {
		return {"response": data};
	} 
	let resultsArray = data.response.results;
	let returnArray = [];
	for (var i = 0; i < resultsArray.length; i++) {
		result = {"title": resultsArray[i].webTitle};
		result["id"] = resultsArray[i].id;
		if (resultsArray[i].fields && resultsArray[i].fields.thumbnail) {
			result["image"] = resultsArray[i].fields.thumbnail;
		}
		result["time"] = resultsArray[i].webPublicationDate;
		result["section"] = resultsArray[i].sectionName;
		result["articleURL"] = resultsArray[i].webUrl;
		if (result.title && result.id && result.section && result.time && result.articleURL) {
			returnArray.push(result);
		}
	}
	return {"response": returnArray};
}

function articleProcess(data) {
	if (data.response.status === "error") {
		return {"response": data};
	} 
	let resultJson = data.response.content;
	var result = {"title": resultJson.webTitle,
					"date": resultJson.webPublicationDate,
					"section": resultJson.sectionName,
					"articleURL": resultJson.webUrl,
					"description": ""};

	if (resultJson.blocks && resultJson.blocks.main && resultJson.blocks.main.elements 
		&& resultJson.blocks.main.elements[0] && resultJson.blocks.main.elements[0].assets 
		&& resultJson.blocks.main.elements[0].assets.length > 0){
		result["image"] = resultJson.blocks.main.elements[0].assets[resultJson.blocks.main.elements[0].assets.length - 1].file
	}

	if (resultJson.blocks) {
		let body = resultJson.blocks.body
		for (var i = 0; i < Math.min(body.length, 15); i++) {
			if (body[i].bodyHtml && !body[i].bodyHtml.includes("iframe")) {
				result["description"]+=body[i].bodyHtml
				// console.log(result["description"])
			}
		}
	}

	return {"response": result};
}

function sectionProcess(data) {
	if (data.response.status === "error") {
		return {"response": data};
	} 

	let resultsArray = data.response.results;
	let returnArray = [];

	for (var i = 0; i < resultsArray.length; i++) {
		var resultJson = resultsArray[i]
		var result = {"title": resultJson.webTitle,
				"time": resultJson.webPublicationDate,
				"section": resultJson.sectionName,
				"id": resultJson.id};
		if (resultJson.blocks && resultJson.blocks.main && resultJson.blocks.main.elements 
			&& resultJson.blocks.main.elements[0] && resultJson.blocks.main.elements[0].assets 
			&& resultJson.blocks.main.elements[0].assets.length > 0){
			result["image"] = resultJson.blocks.main.elements[0].assets[resultJson.blocks.main.elements[0].assets.length - 1].file
		}

		if (result.title && result.id && result.section && result.time) {
			// console.log(result);
			returnArray.push(result);
		}
	}
	return {"response": returnArray};
}

function trendsDataProcess(data){
	let arrayList = data.default.timelineData;
	var returnArray = {"response": []}
	for (var i = 0; i < arrayList.length; i++) {
		let dataEntry = arrayList[i];
		returnArray.response.push(dataEntry.value[0]);
	}
	return returnArray;
}

app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});

app.get('/home', (req, res) => {
	let api_url = "https://content.guardianapis.com/search?order-by=newest&show-fields=starRating,headline,thumbnail,short-url&api-key=9ee2a116-fe34-40b3-a5af-fbbf20724bd4";

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

app.get('/article/*', (req, res) => {
	let api_url = "https://content.guardianapis.com/"+req.params[0]+"?api-key=9ee2a116-fe34-40b3-a5af-fbbf20724bd4&show-blocks=all";

	console.log(api_url);
   fetch(api_url)
   .then(res => res.json())
   .then(data => {
      res.send(articleProcess(data));
   })
   .catch(err => {
      res.send({'error': err});
   });
});

app.get('/search/*', (req, res) => {
	let api_url = "https://content.guardianapis.com/search?q="+req.params[0]+"&order-by=newest&show-fields=starRating,headline,thumbnail,short-url&api-key=9ee2a116-fe34-40b3-a5af-fbbf20724bd4";

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

app.get('/section/*', (req, res) => {
	let api_url = "https://content.guardianapis.com/"+ req.params[0] +"?order-by=newest&show-fields=starRating,headline,thumbnail,short-url&api-key=9ee2a116-fe34-40b3-a5af-fbbf20724bd4";
	if (req.params[0] === "home") {
		api_url = "https://content.guardianapis.com/search?order-by=newest&show-fields=starRating,headline,thumbnail,short-url&api-key=9ee2a116-fe34-40b3-a5af-fbbf20724bd4";
	}
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

app.get('/trends/*', (req, res) => {
	const googleTrends = require('google-trends-api');

	googleTrends.interestOverTime({keyword: req.params[0], startTime: new Date('2019-06-01')})
	.then(function(results){
	  res.send(trendsDataProcess(JSON.parse(results)));
	})
	.catch(function(err){
	  console.error('Oh no there was an error', err);
	});

})


// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});


// https://content.guardianapis.com/search?api-key=9ee2a116-fe34-40b3-a5af-fbbf20724bd4&section=(sport|business|technology|politics)&show-blocks=all
