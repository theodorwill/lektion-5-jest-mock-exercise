import mongoose from "mongoose";

type IExercise = {
    startTime: Date;
    durationInSeconds: number;
    activityType: "running" | "walking" | "biking";
};

const exerciseSchema = new mongoose.Schema<IExercise>({
    startTime: Date,
    durationInSeconds: Number,
    activityType: String,
});

const ExerciseModel = mongoose.model("exercise", exerciseSchema);

export const createExercise = async (exercise: IExercise) => {
    const newExercise = new ExerciseModel(exercise);
    return await newExercise.save();
};

export const getExerciseById = async (id: string) => {
    return await ExerciseModel.findById(id);
};

export const getAllExercises = async () => {
    return await ExerciseModel.find({});
};
 