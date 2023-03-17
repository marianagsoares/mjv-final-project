import express, { Request, Response} from 'express';
import body_parser from 'body-parser';
import authController from './controllers/authController'
const app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));

app.use('/auth', authController);

app.listen(8080, function(){
    console.log("servidor rodando porta 8080");
});