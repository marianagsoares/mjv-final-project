import express from 'express';
import body_parser from 'body-parser';
import cors from 'cors';
import routes from './index';


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

const port = 3000;
app.listen(port, function () {
    console.log("Server running");
});