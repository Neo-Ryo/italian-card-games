const express = require('express');
const Player = express.Router();
const prisma = require('../prisma.js');
const regexIntCheck = require('../middleware/regexIntCheck');
const jwt = require('jsonwebtoken');
const { uuidV4Check, urlImgRegExp } = require('../middleware/regexIntCheck');
const jwtCheck = require('../middleware/jwtCheck');
const bcrypt = require('bcrypt');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  const mType = 'image/jpeg' || 'image/png';
  if (file.mimetype === mType) {
    cb(null, true);
  } else {
    cb(null, false);
    throw new Error({ message: 'mimetype not accepted' });
  }
};
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 3 },
  fileFilter,
});
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

//post an image
Player.post('/avatar', upload.single('avatar'), async (req, res) => {
  try {
    console.log(req.file.path);
    res.status(200).json({ url: req.file });
  } catch (error) {
    res.status(400).json({ message: 'file upload failed' });
  }
});

//get image url test
Player.get('/avatar', async (req, res) => {
  try {
    req.res.status(200).json();
  } catch (error) {
    res.status(400).json(error);
  }
});

//create a new player
Player.post('/', upload.single('avatar'), async (req, res, next) => {
  const { email, pseudo, password } = req.body;
  try {
    const saltRound = 10;
    const avatar = req.file.path ? req.file.path : null;
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
