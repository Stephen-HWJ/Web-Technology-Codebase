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
		result["date"] = resultsArray[i].webPublicationDate;
		if (result.title && result.id && result.section && result.time && result.date) {
			returnArray.push(result);
		}
	}
	return {"response": returnArray};
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

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});


// https://content.guardianapis.com/search?api-key=9ee2a116-fe34-40b3-a5af-fbbf20724bd4&section=(sport|business|technology|politics)&show-blocks=all
