require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
mongoose.plugin(require('./plugins/schemaPlugin'));
const errorMiddleware = require('./middlewares/error-middleware');
const usersRouter = require('./router/users');
const testsRouter = require('./router/tests');
const questionsRouter = require('./router/questions');
const answerRouter = require('./router/answers');

const authMiddleware = require('./middlewares/auth-middleware');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api/users', usersRouter);
app.use('/api', authMiddleware, testsRouter);
app.use('/api', authMiddleware, questionsRouter);
app.use('/api', authMiddleware, answerRouter);
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();