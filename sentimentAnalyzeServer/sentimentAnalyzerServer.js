const express = require('express');
const app = new express();
app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

const dotenv = require('dotenv');
const { request } = require('express');
dotenv.config();
const api_key = process.env.API_KEY;
const api_url = process.env.API_URL;

app.get("/", (req, res) => {
    res.render('index.html');
});

function getNLUInstance() {

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    })
    return naturalLanguageUnderstanding;
}

app.get("/url/emotion", (req, res) => {
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'entities': { 'emotion': true, 'limit': 1 },
            'keywords': { 'emotion': true, 'limit': 1 }
        }
    };
    const analyzer = getNLUInstance();
    analyzer.analyze(analyzeParams)
        .then(analysisResults => {
            //console.log(analysisResults);
            console.log(JSON.stringify(analysisResults.result.entities[0].emotion, null, 2));
            return res.send(analysisResults.result.keywords[0].emotion, null, 2);
            //return res.send(analysisResults);
        })
        .catch(err => {
            return res.send("Request error: " + err);
        });
});

app.get("/url/sentiment", (req, res) => {
    //let resp = req.query.url + 'init/url/sentiment';
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'sentiment': {}
        }
    };
    const analyzer = getNLUInstance();
    analyzer.analyze(analyzeParams)
        .then(analysisResults => {
            console.log(JSON.stringify(analysisResults, null, 2));
            return res.send(analysisResults);
        })
        .catch(err => {
            return res.send("Request error: " + err);
        });
    //return res.send(resp);
});

app.get("/text/emotion", (req, res) => {
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'entities': { 'emotion': true, 'limit': 1 },
            'keywords': { 'emotion': true, 'limit': 1 }
        }
    };
    const analyzer = getNLUInstance();
    analyzer.analyze(analyzeParams)
        .then(analysisResults => {
            //console.log(analysisResults);
            console.log(JSON.stringify(analysisResults.result.entities[0].emotion, null, 2));
            return res.send(analysisResults.result.keywords[0].emotion, null, 2);
            //return res.send(analysisResults);
        })
        .catch(err => {
            return res.send("Request error: " + err);
        });
});

app.get("/text/sentiment", (req, res) => {
    //let resp = req.query.text + 'init/text/sentiment';
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'sentiment': {}
        }
    };
    const analyzer = getNLUInstance();
    analyzer.analyze(analyzeParams)
        .then(analysisResults => {
            console.log(JSON.stringify(analysisResults, null, 2));
            return res.send(analysisResults);
        })
        .catch(err => {
            return res.send("Request error: " + err);
        });
    //return res.send(resp);
});

let server = app.listen(3000, () => {
    console.log('Listening', server.address().port)
})