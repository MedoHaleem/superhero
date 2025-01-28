import { app } from "../src/app";
const request = require("supertest");

describe("API Endpoints", () => {
  it("should return hello world for GET /", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Hello World");
  });

  it("should add a superhero with valid data POST /superheroes", async () => {
    const testSuperhero = {
      name: "Iron Man",
      superpower: "Suit",
      humilityScore: 1,
    };

    const response = await request(app)
      .post("/superheroes")
      .send(testSuperhero);
    expect(response.status).toBe(201);
    expect(response.body.message).toContain("added successfully");
  });

  it("should return validation errors for invalid POST /superheroes", async () => {
    const testInvalidData = {
      name: 1,
      superpower: null,
    };

    const response = await request(app)
      .post("/superheroes")
      .send(testInvalidData);
    expect(response.status).toBe(400);
    expect(response.body.error).toContain("Invalid superhero data");
    expect(response.body.details).toBeInstanceOf(Array);
  });

  it("should return all superheroes for GET /superheroes", async () => {
    const response = await request(app).get("/superheroes");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should validate that the humility score is a number between 1 and 10", async () => {
    const testValidData = {
      name: "Spider-Man",
      superpower: "Web",
      humilityScore: 5,
    };

    // Test with valid data
    const response1 = await request(app)
      .post("/superheroes")
      .send(testValidData);
    expect(response1.status).toBe(201);

    // Test too high
    const testTooHigh = {
      ...testValidData,
      humilityScore: 11,
    };
    const response2 = await request(app).post("/superheroes").send(testTooHigh);
    expect(response2.status).toBe(400);
    expect(response2.body.error).toContain("Invalid superhero data");
    expect(response2.body.details).toBeInstanceOf(Array);

    // Test too low
    const testTooLow = {
      ...testValidData,
      humilityScore: 0,
    };
    const response3 = await request(app).post("/superheroes").send(testTooLow);
    expect(response3.status).toBe(400);
    expect(response3.body.error).toContain("Invalid superhero data");
    expect(response3.body.details).toBeInstanceOf(Array);
  });
});
