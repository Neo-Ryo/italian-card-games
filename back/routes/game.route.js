const express = require('express');
const Game = express.Router();
const prisma = require('../prisma');

Game.get('/', async (req, res) => {
  try {
    const allGames = await prisma.game.findMany();
    res.status(200).json(allGames);
  } catch (error) {
    res.status(400).json(error);
  }
});

Game.post('/', async (req, res) => {
  try {
    const { name, buyIn } = req.body;
    let newGameData;
    if (buyIn) {
      newGameData = { name, buyIn };
    } else {
      newGameData = { name };
    }
    const newGame = await prisma.game.create({
      data: newGameData,
    });
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = Game;
