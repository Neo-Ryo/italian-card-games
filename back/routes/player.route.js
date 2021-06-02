const express = require('express');
const Player = express.Router();
const prisma = require('../prisma.js');
const regexIntCheck = require('../middleware/regexIntCheck');
const jwt = require('jsonwebtoken');
const { uuidV4Check, urlImgRegExp } = require('../middleware/regexIntCheck');
const jwtCheck = require('../middleware/jwtCheck');
//env
const { SECRET } = process.env;

//get all players
Player.get('/', async (req, res) => {
  try {
    const allPlayers = await prisma.player.findMany();
    res.status(200).json(allPlayers);
  } catch (error) {
    res.status(400).json(error);
  }
});

//create a new player
Player.post('/', async (req, res, next) => {
  const { email, pseudo, avatar } = req.body;
  try {
    const createAPlayer = await prisma.player.create({
      data: {
        email,
        pseudo,
        avatar,
      },
    });
    if (createAPlayer) jwt.sign({ data: email }, SECRET, { expiresIn: '1h' });
    res.status(201).json(createAPlayer);
  } catch (error) {
    res.status(400);
    next(error);
  }
});

//login
Player.post('/login', async (req, res) => {
  const { email } = req.body;
  try {
    const login = await prisma.player.findUnique({
      where: {
        email,
      },
    });
    const token = jwt.sign({ data: email }, SECRET, { expiresIn: '1h' });
    res.status(200).json({ ...login, token });
  } catch (error) {
    res.status(404).json(error);
  }
});

//update wallet
Player.put(
  '/:uuid/wallet',
  regexIntCheck(uuidV4Check),
  jwtCheck,
  async (req, res) => {
    const { uuid } = req.params;
    const { newBalance } = req.body;
    try {
      const updatedWallet = await prisma.player.update({
        where: { id: uuid },
        data: {
          wallet: newBalance,
        },
      });
      res.status(202).json(updatedWallet);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

module.exports = Player;
