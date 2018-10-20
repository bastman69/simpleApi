var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var routes = require(path.join(__dirname, 'routes', 'index.js'));

var app = express();

let store = {
    posts: [
        {
            name: 'Top 10 ES6 Features every Web Developer must know',
            url: 'https://webapplog.com/es6',
            text: 'This essay will give you a quick introduction to ES6.',
            comments: [
                { text: 'Cruel…..var { house, mouse} = No type optimization at all' },
                { text: 'I think you’re undervaluing the benefit of ‘let’ and ‘const’.' },
                { text: '(p1,p2)=>{ … } ,i understand this ,thank you !' }
            ]
        }
    ]
}
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    req.store = store
    next()
});
app.get('/posts', routes.posts.getPosts);
app.post('/posts', routes.posts.addPost);
app.put('/posts/:postId', routes.posts.updatePost);
app.delete('/posts/:postId', routes.posts.removePost);

app.get('/posts/:postId/comments', routes.comments.getComments);
app.post('/posts:postId/comments', routes.comments.addComment);
app.put('/posts/:postId/comments/commentID', routes.comments.updateComment);
app.delete('/posts/:postId/comments/commentID', routes.comments.removeComment);

module.exports = app;
