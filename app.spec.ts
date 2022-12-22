import { default as request } from "supertest";
import { makeApp } from "./app";

describe("POST /excersise", () => {
    it("should create a new excersise", async () => {
        const createExercise = jest.fn();
        const app = makeApp({ createExercise });

        await request(app).post("/exercise").send({ name: "pushups" });

        expect(createExercise).toHaveBeenCalledWith({ name: "pushups" });
    });
})