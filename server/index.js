const express = require('express');
const port = 8080;
const app = express();


app.get('/', (req, res) => {
  res.send('request')
})

app.get('/jsonp', (req, res) => {
  const data = {
    a: '1'
  }
  setTimeout(() => {
    res.send(`${req.query.callback}(${JSON.stringify(data)})`)
  }, 1000)

})

app.get('/corsSimple', (req, res) => {
  console.log('corsSimple request')
  res.send('corsSimple request')
})
app.put('/corsComplex', (req, res) => {
  console.log('corsComplex request')
  res.send('corsComplex request')
})
app.get('/fetch', (req, res) => {
  res.send('fetch get request')
})
app.put('/fetch', (req, res) => {
  res.send('fetch put request')
})
app.listen(port, () => {
  console.log(`listen ${port}`)
})