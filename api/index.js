const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'});
const fs = require('fs');
require('dotenv').config();


const salt = bcrypt.genSaltSync(10);
const secret = "fsafsfasgeqg";

app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect(process.env.MONGODB_URL)

app.post('/register', async (req, res) => {
    const {user, pw} = req.body;
    try {
        const userDoc = await User.create({
            user, 
            pw:bcrypt.hashSync(pw, salt),
        });
        res.json(userDoc);
    } catch(e) {
        res.status(400).json(e);
    }
    
});

app.post('/login', async (req, res) => {
    const {user, pw} = req.body;
    const userDoc = await User.findOne({user});
    const authenticated = bcrypt.compareSync(pw, userDoc.pw);
    if (authenticated) {
        // logged in
        jwt.sign({user, id:userDoc._id}, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id:userDoc._id,
                user,
            });
        });
    } else {
        res.status(400).json('Wrong Credentials');
    }
});

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
});

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const fileExt = parts[parts.length - 1];
    const newPath = path+'.'+fileExt;
    fs.renameSync(path, newPath);

    // getting info on author
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const {title, summary, content} = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover:newPath,
            author: info.id,
        });
        res.json(postDoc);
    });
});

app.get('/post', async (req,res) => {
    res.json(
        await Post.find()
          .populate('author', ['user'])
          .sort({createdAt: -1})
          .limit(20)
    );
});

app.get('/post/:id', async(req, res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', ['user']);
    res.json(postDoc);
});

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const {originalname, path} = req.file;
        const parts = originalname.split('.');
        const fileExt = parts[parts.length - 1];
        newPath = path+'.'+fileExt;
        fs.renameSync(path, newPath);
    }
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const {id, title, summary, content} = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            return res.status(400).json('Invalid Author!');
        }
        postDoc.title = title;
        postDoc.summary = summary;
        postDoc.content = content;
        postDoc.cover = newPath ? newPath : postDoc.cover;
        await postDoc.save();
        res.json(postDoc);
    });
});

app.listen(4000);
