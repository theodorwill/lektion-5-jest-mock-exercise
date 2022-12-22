import { makeApp } from './app';
import mongoose from 'mongoose';
import { createExercise, getExerciseById, getAllExercises } from './db-calls';

const app = makeApp({ createExercise, getExerciseById, getAllExercises });

const port = process.env.PORT || 8080;

mongoose.connect("mongodb://localhost:27017/myapp").then(() => {
    app.listen(port, () => {
        console.log(`App listening to port ${port}`)
    })
})