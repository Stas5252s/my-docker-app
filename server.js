const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Привет из Docker-контейнера на Mac! 🚀');
});

app.listen(PORT, () => {
  console.log(`Приложение запущенно на порту ${PORT}`);
});
