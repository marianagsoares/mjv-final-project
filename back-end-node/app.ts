import express from 'express';
import body_parser from 'body-parser';
import authController from './controllers/authController';
import userController from './controllers/userController';

const app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));

app.use(authController);
app.use('/authenticated', userController);

app.listen(8080, function(){
    console.log("Server running");
});