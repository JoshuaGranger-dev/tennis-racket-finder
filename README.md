# Tennis Racket Finder

Tennis Racket Finder is a full-stack web app being built as the foundation for a personalized tennis racket recommendation system.

The current version lets users browse, search, filter, add, delete, and edit tennis racket data. The long-term goal is to turn this into a recommendation database where users answer questions about their playing style, current racket, preferences, and goals, then receive racket suggestions based on their profile.

## Project Vision

This project is not meant to stay as a simple racket list.

The long-term goal is to build a tennis racket recommendation platform that can:

* Recommend rackets based on user answers
* Store racket specifications in a database
* Let users create profiles
* Track rackets users have used
* Save and update user preferences
* Suggest new rackets when user answers change
* Eventually use AI to explain recommendations and compare racket options

## Current Features

### Frontend

* React/Vite frontend
* Fetches racket data from the backend
* Displays racket cards
* Search by brand or model
* Filter by brand
* Filter by string pattern
* Clear filters button
* Results count
* Empty results message
* Loading state
* Error state
* Add racket form
* Basic form validation
* Delete racket button
* Inline weight editing

### Backend

* Express backend API
* In-memory racket data
* CORS enabled
* JSON request body parsing
* Get all rackets
* Get one racket by ID
* Filter rackets with query parameters
* Search rackets by brand or model
* Create a new racket
* Delete a racket
* Update a racket

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* Fetch API

### Backend

* Node.js
* Express.js
* JavaScript
* CORS

## Current API Routes

| Method | Route                          | Description                      |
| ------ | ------------------------------ | -------------------------------- |
| GET    | `/`                            | Test route                       |
| GET    | `/rackets`                     | Get all rackets                  |
| GET    | `/rackets?brand=Wilson`        | Filter rackets by brand          |
| GET    | `/rackets?stringPattern=16x19` | Filter rackets by string pattern |
| GET    | `/rackets?search=aero`         | Search rackets by brand or model |
| GET    | `/rackets/:id`                 | Get one racket by ID             |
| POST   | `/rackets`                     | Add a new racket                 |
| PATCH  | `/rackets/:id`                 | Update a racket                  |
| DELETE | `/rackets/:id`                 | Delete a racket                  |

## Example Racket Object

```js
{
  id: 1,
  brand: "Wilson",
  model: "Pro Staff RF97 v13",
  headSize: 97,
  weight: 340,
  stringPattern: "16x19"
}
```

## How to Run Locally

This project has a backend and frontend in one repository.

### 1. Clone the repository

```bash
git clone https://github.com/JoshuaGranger-dev/tennis-racket-finder.git
```

### 2. Open the project folder

```bash
cd tennis-racket-finder
```

## Run the Backend

From the root project folder:

```bash
cd backend
npm install
npm start
```

The backend should run at:

```txt
http://localhost:5000
```

Test the backend in the browser:

```txt
http://localhost:5000/rackets
```

## Run the Frontend

Open a second terminal from the root project folder:

```bash
cd frontend
npm install
npm run dev
```

The frontend should run at:

```txt
http://localhost:5173
```

## Important Notes

This project currently uses in-memory data.

That means added, deleted, or edited rackets will reset when the backend server restarts. This is expected for the current learning version.

A future version will use PostgreSQL so racket data, user profiles, preferences, and recommendations can persist.

## Future Roadmap

### Phase 1: Full-Stack CRUD Foundation

* React frontend
* Express backend
* Racket cards
* Search and filters
* Add racket
* Delete racket
* Edit racket
* Loading and error states

### Phase 2: Better Racket Data Model

Add more racket decision-making specs:

* Swingweight
* Balance
* Stiffness
* Beam width
* Length
* Power rating
* Spin rating
* Control rating
* Comfort rating
* Play style tags

### Phase 3: PostgreSQL Database

Move from in-memory data to a real database:

* Create a rackets table
* Store racket specs
* Replace array methods with SQL queries
* Import cleaned racket data from spreadsheet
* Persist added/edited/deleted rackets

### Phase 4: Recommendation Questionnaire

Build a form that asks users about:

* Current racket
* Skill level
* Play style
* Desired improvements
* Arm comfort needs
* Preferred weight range
* Power/spin/control priorities

### Phase 5: Rule-Based Recommendation Engine

Recommend rackets based on structured logic before adding AI.

Examples:

* If a user wants more spin, prioritize spin-friendly frames.
* If a user has arm discomfort, avoid very stiff rackets.
* If a user wants easier depth, prioritize more powerful and forgiving frames.
* If a user is moving away from a heavy control racket, suggest lighter options without losing too much stability.

### Phase 6: User Profiles

Allow users to:

* Save their answers
* Update preferences
* Track current and past rackets
* Save recommended rackets
* Record what they liked or disliked about previous rackets

### Phase 7: AI-Assisted Recommendations

Eventually add AI to:

* Explain why certain rackets fit a user
* Compare rackets in plain English
* Ask follow-up questions
* Translate user feedback into racket-spec recommendations

## What I Practiced

* Building a full-stack app with React and Express
* Creating REST API routes
* Using query parameters
* Handling GET, POST, PATCH, and DELETE requests
* Managing React state
* Passing props between components
* Controlled forms
* Basic validation
* Conditional rendering
* Loading and error states
* Connecting frontend actions to backend routes
* Git and GitHub workflow

## Current Status

This project is currently a working full-stack CRUD foundation.

The next major step is preparing the data model and adding PostgreSQL so the app can become a real racket recommendation database.
