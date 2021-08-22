const express = require('express');
const dotenv = require('dotenv');
const app = new express();
dotenv.config();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

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

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/", (req, res) => {
    res.render('index.html');
});

app.get("/url/emotion", (req, res) => {
    let resp = req.query.url + 'init/url/emotion';
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'emotion': {
                'targets': [
                    'humans',
                    'robots'
                ]
            }
        }
    };
    const analyzer = getNLUInstance();
    analyzer.analyze(analyzeParams)
        .then(analysisResults => {
            console.log(JSON.stringify(analysisResults, null, 2));
            resp = JSON.stringify(analysisResults, null, 2);
        })
        .catch(err => {
            resp = ('error:' + err);
        });
    return res.send({ "happy": "73", "sad": "27", resp });
});

app.get("/url/sentiment", (req, res) => {
    let resp = req.query.url + 'init/url/sentiment';
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'sentiment': {
                'targets': [
                    'bonds'
                ]
            }
        }
    };
    const analyzer = getNLUInstance();
    analyzer.analyze(analyzeParams)
        .then(analysisResults => {
            console.log(JSON.stringify(analysisResults, null, 2));
            resp = JSON.stringify(analysisResults, null, 2);
        })
        .catch(err => {
            resp = ('error:' + err);
        });
    return res.send(resp);
});

app.get("/text/emotion", (req, res) => {
    let resp = req.query.text + 'init/text/emotion';
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'emotion': {
                'targets': [
                    'humans',
                    'robots'
                ]
            }
        }
    };
    const analyzer = getNLUInstance();
    analyzer.analyze(analyzeParams)
        .then(analysisResults => {
            console.log(JSON.stringify(analysisResults, null, 2));
            resp = JSON.stringify(analysisResults, null, 2);
        })
        .catch(err => {
            resp = ('error:' + err);
        });
    return res.send({ "happy": "82", "sad": "18", resp });
});

app.get("/text/sentiment", (req, res) => {
    let resp = req.query.text + 'init/text/sentiment';
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'sentiment': {
                'targets': [
                    'bonds'
                ]
            }
        }
    };
    const analyzer = getNLUInstance();
    analyzer.analyze(analyzeParams)
        .then(analysisResults => {
            console.log(JSON.stringify(analysisResults, null, 2));
            resp = analysisResults;
        })
        .catch(err => {
            resp = ('error:' + err);
        });
    return res.send(resp);
});

let server = app.listen(3000, () => {
    console.log('Listening', server.address().port)
})