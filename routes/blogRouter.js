const express = require('express');
const blogRouter = express.Router();
const { getAllPosts, postNewUser, postVerifyUser, postNewPost, changeMembershipStatus, changeAdminStatus, deletePost } = require('../db/queries');
const bcrypt = require('bcryptjs');
const { passport } = require('../db/auth')
require('dotenv').config();
const CODE = process.env.SECRETMEMBERCODE;
const CODE2 = process.env.SECRETADMINCODE;


blogRouter.get('/', async (req, res) => {
    const posts = await getAllPosts();
    const userStatus = req.user;
    //console.log("logged in or not:",req.user);
    res.render("index", {
        posts: posts,
        userStatus: userStatus
    });
});
blogRouter.get('/sign-up', (req, res) => {
    const userStatus = req.user;
    res.render("sign-up-page", {
        title: "Sign-Up",
        userStatus: userStatus
    });
})
blogRouter.post('/sign-up', async (req, res) => {
    try {
        const { firstname, lastname, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const isMember = false;
        const isAdmin = false;
        await postNewUser(firstname, lastname, username, hashedPassword, isMember, isAdmin);
        res.redirect('/login')
    } catch (err) {
        console.log(err);
    }
});
blogRouter.get('/login', (req, res) => {
    const userStatus = req.user;
    res.render('login-page', {
        userStatus: userStatus
    });
})
blogRouter.post('/login', passport.authenticate("local", {
    successRedirect: '/',
    failureRedirect: '/'
}))

blogRouter.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    })
})

blogRouter.get('/create-post', (req, res) => {
    const userStatus = req.user;
    res.render('create-post', {
        userStatus: userStatus
    })
})

blogRouter.post('/create-post', async (req,res) => {
    const { post } = req.body;
    const id = req.user.id;
    //console.log(id, post, author);
    await postNewPost(post, id);
    res.redirect('/');
})

blogRouter.get('/join-club', (req, res) => {
    const userStatus = req.user;
    console.log('userStatus:', userStatus);
    res.render('join-club', {
        userStatus: userStatus
    });
});

blogRouter.post('/join-club', async (req,res) => {
    const { code } = req.body;
    const id = req.user.id;
    if (code === CODE) {
        await changeMembershipStatus(id);
    }
    res.redirect('/');
})

blogRouter.get('/admin', (req, res) => {
    const userStatus = req.user;
    res.render('admin', {
        userStatus: userStatus
    })
})

blogRouter.post('/admin', async (req, res) => {
    const { code } = req.body;
    const id = req.user.id;
    if (code === CODE2) {
        await changeAdminStatus(id);
    }
    res.redirect('/')
})

blogRouter.post('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await deletePost(id);
    res.redirect('/');
})

module.exports = blogRouter;