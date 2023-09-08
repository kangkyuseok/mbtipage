const express = require('express');
const path = require('path');
const app = express();
const port = 3003;


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});



// public 폴더를 static으로 설정
// app.use(express.static(path.join(__dirname, '../public')));





app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
