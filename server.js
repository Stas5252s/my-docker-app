const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/my_database';

app.use(morgan('dev'));

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

const VisitSchema = new mongoose.Schema({
  count: { type: Number, default: 0 },
  date: { type: Date, default: Date.now }
});
const Visit = mongoose.model('Visit', VisitSchema);

app.get('/', async (req, res) => {
  try {
    let visitRecord = await Visit.findOne();
    if (!visitRecord) {
      visitRecord = new Visit({ count: 0 });
    }
    
    visitRecord.count += 1;
    await visitRecord.save();

    res.send(`<h1>Привет из Docker Compose! 🚀</h1><p>Эту страницу открывали уже <b>${visitRecord.count}</b> раз(а).</p>`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка при работе с базой данных');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});