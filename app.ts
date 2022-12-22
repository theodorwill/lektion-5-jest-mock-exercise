import express, { json } from 'express';
import { getWeatherData } from './weather-data';
import mongoose from 'mongoose';


export const makeApp = ({ createExercise, getExerciseById, getAllExercises}: any) => {
    const app = express();

    app.use(json());

    app.post('/exercise', async (req, res) => {
        const exercise = new createExercise(req.body);
        res.json(await exercise.save());
    });

    app.get('/exercise', async (req, res) => {
        res.json(await getAllExercises());
    });

    app.get('/exercise/:id', async (req, res) => {
        const exercise = await getExerciseById(req.params.id);
    });

    return app;
}