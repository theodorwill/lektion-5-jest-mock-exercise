import express, { json } from 'express';
import axios from 'axios';

import mongoose from 'mongoose';

const app = express();

app.use(json());

type IExercise = {
    startTime: Date,
    durationInSeconds: Number,
    activityType: "running" | "walking" | "biking"
}

const exerciseSchema = new mongoose.Schema<IExercise>({
    startTime: Date,
    durationInSeconds: Number,
    activityType: String
});

const ExerciseModel = mongoose.model("exercise", exerciseSchema);

app.post('/exercise', async (req, res) => {
    const exercise = new ExerciseModel(req.body);
    res.json(await exercise.save());
});

app.get('/exercise', async (req, res) => {
    res.json(await ExerciseModel.find({}));
});

app.get('/exercise/:id', async (req, res) => {
    const exercise = await ExerciseModel.findById(req.params.id);

    if (!exercise) {
        res.status(404).send();
    } else {
        const weatherAPI = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&start_date=2022-06-08&end_date=2022-06-08&daily=temperature_2m_max&timezone=GMT')
        res.json({ startTime: exercise.startTime, durationInSeconds: exercise.durationInSeconds, activityType: exercise.activityType, temperature: weatherAPI.data.daily.temperature_2m_max[0] });
    }
});

const port = process.env.PORT || 8080;

mongoose.connect("mongodb://localhost:27017/myapp").then(() => {
    app.listen(port, () => {
        console.log(`App listening to port ${port}`)
    })
})