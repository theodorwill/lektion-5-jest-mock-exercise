import { default as request } from "supertest";
import { makeApp } from "./app";
import nock from "nock";

const scope = nock('https://api.open-meteo.com')
    .persist()
    .get('/v1/forecast?latitude=52.52&longitude=13.41&start_date=2022-06-08&end_date=2022-06-08&daily=temperature_2m_max&timezone=GMT')
    .reply(200,
        {
            latitude: 52.52,
            longitude: 13.419998,
            generationtime_ms: 0.247955322265625,
            utc_offset_seconds: 0,
            timezone: 'GMT',
            timezone_abbreviation: 'GMT',
            elevation: 38,
            daily_units: { time: 'iso8601', temperature_2m_max: '°C' },
            daily: { time: [Array], temperature_2m_max: [25.6] }
        }
    )


const validExerciseData = {
    "startTime": "2017-01-01 11:50",
    "durationInSeconds": 360,
    "activityType": "running",
    "temperature": 25.6,
}


const mockFunctions = {
    createExercise: jest.fn(),
    getAllExercises: jest.fn(),
    getExerciseById: jest.fn(),
};


const app = makeApp(mockFunctions);


it("should return all exercises", async () => {
    await request(app).post("/exercise").expect(200);
});

it("should return exercises by id", async () => {
    mockFunctions.getAllExercises.mockResolvedValue([validExerciseData]);
    const response = await request(app).get("/exercise/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([validExerciseData]);
})

it("should return 404 if no id", async () => {
    const response = await request(app).get("/exercise/something");
    expect(response.status).toBe(400);
})

it("should return 404", async () => {
    mockFunctions.getAllExercises.mockResolvedValue([]);
    const response = await request(app).get("/exercise/1");
    expect(response.status).toBe(404);
})

it("should create a new exercise", async () => {
    const response = await request(app).post("/exercise").send(validExerciseData);
    expect(response.status).toBe(200);
})