const express = require('express');
const Player = express.Router();
const prisma = require('../prisma.js');
const regexIntCheck = require('../middleware/regexIntCheck');
const jwt = require('jsonwebtoken');
const { uuidV4Check, urlImgRegExp } = require('../middleware/regexIntCheck');
const jwtCheck = require('../middleware/jwtCheck');
const bcrypt = require('bcrypt');
//env
const { SECRET } = process.env;

//get all players
Player.get('/', async (req, res) => {
  try {
    const allPlayers = await prisma.player.findMany({
      select: {
        id: true,
        email: true,
        pseudo: true,
        avatar: true,
        wallet: true,
      },
    });
    res.status(200).json(allPlayers);
  } catch (error) {
    res.status(400).json(error);
  }
});

//create a new player
Player.post('/', async (req, res, next) => {
  const { email, pseudo, password, avatar } = req.body;
  try {
    const saltRound = 10;
    const crypted = await bcrypt.hash(password, saltRound);
    const createAPlayer = await prisma.player.create({
      data: {
        email,
        password: crypted,
        pseudo,
        avatar,
      },
    });
    if (createAPlayer) {
      const token = jwt.sign({ data: email }, SECRET, { expiresIn: '1h' });
      res.status(201).json({ ...createAPlayer, token });
    }
  } catch (error) {
    res.status(400);
    next(error);
  }
});

//login
Player.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashed = await prisma.player.findUnique({
      where: { email },
    });
    console.log(hashed.password);
    const match = await bcrypt.compare(password, hashed.password);
    console.log(match);
    if (match) {
      const login = await prisma.player.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          email: true,
          avatar: true,
          wallet: true,
        },
      });
      const token = jwt.sign({ data: email }, SECRET, { expiresIn: '1h' });
      res.status(200).json({ ...login, token });
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(404).json({ message: 'indentifiant incorrect' });
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

//to remove or modify
Player.delete('');

module.exports = Player;
