import express from 'express';
import body_parser from 'body-parser';
import cors from 'cors';
import routes from './src/app/middleware/routes.middleware';
import './src/config/env';
import connection from './src/config/database';


const app = express();

app.use((req, res, next) => {
    const corsOpts = {
        origin: '*',

        methods: [
            'GET',
            'POST',
            'PUT',
            'DELETE'
        ],

        allowedHeaders: [
            'Content-Type'
        ]
    };
    app.use(cors(corsOpts));
    next();
});
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(routes);

const port = process.env.LIST_PORT;

connection.then(() => {
    console.log('Conected to database');
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
});