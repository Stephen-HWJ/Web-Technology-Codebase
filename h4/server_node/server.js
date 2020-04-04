const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
app.use(cors());

const guardian_api = "https://content.guardianapis.com/";
const guardian_key = "9ee2a116-fe34-40b3-a5af-fbbf20724bd4";
const guardian_img = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
// https://content.guardianapis.com/search?api-key=9ee2a116-fe34-40b3-a5af-fbbf20724bd4&section=(sport|business|technology|politics)&show-blocks=all

const nyt_api = "https://api.nytimes.com/svc/topstories/v2/";
const nyt_key = ".json?api-key=jbCOd2UUEnht6m84577J7N59NPj8MwT7";
// https://api.nytimes.com/svc/topstories/v2/world.json?api-key=jbCOd2UUEnht6m84577J7N59NPj8MwT7

function guardianDataProcess(data) {
	if (data.response.status === "error") {
		return {"returnArray": data};
	} 
	let resultsArray = data.response.results;
	let returnArray = [];
	for (var i = 0; i < resultsArray.length; i++) {
		result = {"title": resultsArray[i].webTitle};
		result["id"] = resultsArray[i].id;
		if (!resultsArray[i].blocks.main || !resultsArray[i].blocks.main.elements || !resultsArray[i].blocks.main.elements[0].assets || resultsArray[i].blocks.main.elements[0].assets.length===0) {
			result["image"] = guardian_img;
		} else {
			result["image"] = resultsArray[i].blocks.main.elements[0].assets[resultsArray[i].blocks.main.elements[0].assets.length-1].file;
		}
		// result["image"] = resultsArray[i].blocks.main.elements[0].assests.length>0 ? resultsArray[i].blocks.main.elements[0].assests[length-1] : guardian_img;
		result["section"] = resultsArray[i].sectionId;
		result["url"] = resultsArray[i].webUrl;
		result["date"] = resultsArray[i].webPublicationDate;
		result["description"] = resultsArray[i].blocks.body[0].bodyTextSummary;
		if (result.title && result.id && result.image && result.section && result.url && result.date && result.description) {
			returnArray.push(result);
		}
	}
	return {"returnArray": returnArray.slice(0, 10)};
}

function guardianSearchProcess(data) {
	if (data.response.status === "error") {
		return {"returnArray": data};
	} 
	let resultsArray = data.response.results;
	let returnArray = [];
	for (var i = 0; i < resultsArray.length; i++) {
		result = {"title": resultsArray[i].webTitle};
		result["id"] = resultsArray[i].id;
		if (!resultsArray[i].blocks.main || !resultsArray[i].blocks.main.elements || !resultsArray[i].blocks.main.elements[0].assets || resultsArray[i].blocks.main.elements[0].assets.length===0) {
			result["image"] = guardian_img;
		} else {
			result["image"] = resultsArray[i].blocks.main.elements[0].assets[resultsArray[i].blocks.main.elements[0].assets.length-1].file;
		}
		// result["image"] = resultsArray[i].blocks.main.elements[0].assests.length>0 ? resultsArray[i].blocks.main.elements[0].assests[length-1] : guardian_img;
		result["section"] = resultsArray[i].sectionId;
		result["url"] = resultsArray[i].webUrl;
		result["src"] = "guardian";
		result["date"] = resultsArray[i].webPublicationDate;
		// result["description"] = resultsArray[i].blocks.body[0].bodyTextSummary;
		if (result.title && result.id && result.image && result.section && result.url && result.date && result.src) {
			returnArray.push(result);
		}
	}
	return {"search": returnArray.slice(0, 10)};
}

function guardianContentProcess(data) {
	if (data.response.status === "error") {
		return {"content": data};
	}
	let content = data.response.content;
	let result = {"title": content.webTitle,
				  "date": content.webPublicationDate,
				  "description": content.blocks.body[0].bodyTextSummary,
				  "section": content.sectionId, "url": content.webUrl};
	if (!content.blocks.main || !content.blocks.main.elements || 
		content.blocks.main.elements.length === 0 || !content.blocks.main.elements[0].assets || 
		content.blocks.main.elements[0].assets.length === 0) {
		result["image"] = "http://csci571.com/hw/hw8/images/guardian.png";
	} else {
		result["image"] = content.blocks.main.elements[0].assets[content.blocks.main.elements[0].assets.length - 1].file;
	}
	return {"content": result};
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
			if (!result.multimedia || result.multimedia.length === 0){
				rData["image"] = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
			} else {
				for (var j = 0; j < result.multimedia.length; j++) {
					let img = result.multimedia[j];
					if (img.width >= 2000) {
						rData["image"] = "https://nytimes.com/" + img.url
						break;
					}
				}
			}
			rData["section"] = result.section;
			rData["url"] = result.url;
			rData["id"] = result.url;
			rData["date"] = result.published_date;
			rData["description"] = result.abstract;
			if (rData.title && rData.id && rData.image && rData.section && rData.url && rData.date && rData.description) {
				returnArray.push(rData);
			}
		}
	}

	return {"returnArray": returnArray.slice(0, 10)};
}

function nytContentProcess(data) {
	if (data.response.status === "error") {
		return {"content": data};
	}
	let content = data.response.docs[0];
	let result = {"title": content.headline.main,
				  "date": content.pub_date, "url": content.web_url,
				  "description": content.abstract, "section": content.news_desk};
	for (var i = 0; i < content.multimedia.length; i++) {
		let img = content.multimedia[i];
		if (img.width >= 2000) {
			result["image"] = "https://nytimes.com/" + img.url
			break;
		}
	}
	if (!result["image"]) {
		result["image"] = "http://csci571.com/hw/hw8/images/nytimes.jpg"
	}
	return {"content": result};
}

function nytSearchProcess(data) {
	if (data.response.status === "error") {
		return {"content": data};
	}
	let returnArray = [];
	for (var i = 0; i < data.response.docs.length; i++) {
		let content = data.response.docs[i];
		let result = {"title": content.headline.main,
					  "date": content.pub_date, "src": "nyt",
					  "url": content.web_url, "id": content.web_url, "section": content.news_desk};
		for (var j = 0; j < content.multimedia.length; j++) {
			let img = content.multimedia[j];
			if (img.width >= 2000) {
				result["image"] = "https://nytimes.com/" + img.url
				break;
			}
		}
		if (!result["image"]) {
			result["image"] = "http://csci571.com/hw/hw8/images/nytimes.jpg"
		}
		if (result.title && result.id && result.image && result.section && result.url && result.date && result.src) {
			returnArray.push(result);
		}
	}
	return {"search": returnArray.slice(0, 10)};
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
		api_url += "search?api-key="+guardian_key+"&section=(sport|business|technology|politics|world)&show-blocks=all";
	} else {
		if (req.params.section === "sports") {
			req.params.section = "sport"
		}
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
   fetch("https://nodejs-hwj.appspot.com/nyt/home")
   .then(res => res.json())
   .then(data => {
      res.send(data);
   })
   .catch(err => {
      res.send({'error': err});
   });
});

app.get('/article/:source/*', (req, res) => {
	let api_url = ""
	if (req.params.source === "guardian") {
		api_url += guardian_api + req.params[0] + "?api-key=" + guardian_key + "&show-blocks=all";
	} else if (req.params.source === "nyt") {
		api_url += 'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:("'+req.params[0]+'")&api-key=jbCOd2UUEnht6m84577J7N59NPj8MwT7';
	} else {
		res.send({'error': "wrong source api"});
	}
   fetch(api_url)
   .then(res => res.json())
   .then(data => {
	   	if (req.params.source === "guardian") {
	      res.send(guardianContentProcess(data));
	  }else {
	  	res.send(nytContentProcess(data));
	  }
   })
   .catch(err => {
      res.send({'error': err});
   });
});

app.get('/search/:source/*', (req, res) => {
	let api_url = "";
	if (req.params.source === "guardian") {
		api_url += guardian_api + "search?q=" + req.params[0] +"&api-key=" + guardian_key + "&show-blocks=all";
	} else if (req.params.source === "nyt") {
		api_url += "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+req.params[0]+"&api-key=jbCOd2UUEnht6m84577J7N59NPj8MwT7";
	} else {
		res.send({'error': "wrong source api"});
	}
	   fetch(api_url)
   .then(res => res.json())
   .then(data => {
	   	if (req.params.source === "guardian") {
	      res.send(guardianSearchProcess(data));
	  }else {
	  	res.send(nytSearchProcess(data));
	  }
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
