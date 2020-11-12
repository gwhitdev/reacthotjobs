const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const enforce = require('express-sslify');
const path = require('path');

const port = 5000;
const environment = process.env.NODE_ENV || 'dev';

app.use(cors());

app.get('/search/:jobs/:max', (req, res) => {
    const jobs = req.params.jobs;
    const max = req.params.max;
    console.log(`jobs received: ${jobs}
    max received: ${max}`);
    

    axios(`https://indreed.herokuapp.com/api/jobs?q=${jobs}&l=England&country=UK&max=${max}`)
        .then(response => response.data)
        .catch(error => {
          console.error(error);
          data = 'Sorry. No data was received, please try again.';
          res.send(data)
        })
        .then(data => res.send(data))

        
})
app.get('/backend', (req, res) => {
    res.send({"express": "backend connected"});
})

if (environment !== 'dev') {
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
    app.use(express.static(path.join("client", "build")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }

app.listen(process.env.PORT || port, () => console.log('Listening on ', port));