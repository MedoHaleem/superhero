# Task Assignment: Building a Humble Superhero API

## Objective
Create a simple API that lets users:
- Add a new superhero, specifying their name, superpower, and a "humility score" (e.g., a rating out of 10 that shows how humble they are).
- Fetch the list of superheroes, ordered by their humility score in descending order.

## Requirements

### Backend
- Use Node.js framework (I chose Express.js for simplicity).
- Store the superhero data in a simple in-memory database (an array).
- Create two endpoints:
  - `POST /superheroes`: Add a new superhero (name, superpower, and humility score required).
  - `GET /superheroes`: Fetch the list of superheroes sorted by humility score.

### Frontend 
- Quick and barebone React Interface to submit and list heros.
- Added validation on both frontend and backend.

---

## Setup Instructions

### Prerequisites
- Node.js (>=16.0.0)
- npm (>=7.0.0)

### Installation Steps
1. Clone this repository:
   ```bash
   git clone git@github.com:MedoHaleem/superhero.git
   cd superhero
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
To start both frontend and backend together:
```bash
npm run start
```

To run the backend separately:
```bash
npm run start -w backend
```

To run the frontend separately:
```bash
npm run dev -w frontend
```

---

## Running Tests

### Backend Tests
1. Run tests using Jest:
   ```bash
   npm run test -w backend
   ```

## Collaborating with a Teammate

With my teammate we would have to divide the tasks based on strengths: one focusing on backend (NestJS, validations, unit tests) and the other on frontend (React, general UI and UX). Jira for task management, and regular syncs.

## If I Had More Time

1. Persistent Storage: Instead of using an in-memory database, I would integrate a real database like PostgreSQL.

2. Authentication and Authorization: so that different users can manage their own superhero lists securely.

3. Adding list creation so users can create and share lists on the website

4. this might be expensive 😂 but we can integrate stable diffusion to generate images of superheros similar to [this](https://civitai.com/models/8949/jim-lee-dc-comics-marvel-style-lora) (saving the images in S3 bucket) so now the users will have pictures of the imagined superhero.
