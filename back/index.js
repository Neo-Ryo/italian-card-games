require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const prisma = require('./prisma');
const Player = require('./routes/player.route');
const Game = require('./routes/game.route');

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/players', Player);
app.use('/games', Game);
async function main() {
  try {
    app.listen(PORT, () => {
      console.log(`listening to localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
