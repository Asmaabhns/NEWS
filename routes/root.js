import express from 'express';
export const rootRouter = express.Router();
rootRouter.get('/', (req, res) => {
    res.send('API is running');
}
);