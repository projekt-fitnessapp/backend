# Notes for BE

## Database

### Data entities

Example for exercises:

```JSON
{
  "exercise_id": 0,
  "name": "Bench press",
  "muscle_group": "Breast",
  "type": "push"
}
```

Example for trainingplan:

```JSON
{
  "trainingplan_id": 0,
  "plan_name": "Plan Name",
  "type": "push|pull|leg|full",
  "exercises": [
    {
      "exercise_id": 0,
      "sets": [
        { "reps": 0, "weight_in_kg": 0 },
        { "reps": 0, "weight_in_kg": 0 }
      ]
    },
    {
      "exercise_id": 1,
      "sets": [
        { "reps": 0, "weight_in_kg": 0 },
        { "reps": 0, "weight_in_kg": 0 }
      ]
    }
  ]
}
```

Example for User:

```JSON
{
  "user_id": 0,
  "user_name": "JohnDoe123",
  "name": {
    "first_name": "John",
    "last_name": "Doe"
  },
  "trainingplans": [0], // trainingsplan_id
  "workouts": [
    {
      "date": "2022-08-22T16:00:00Z",
      "plan_name": "Plan Name",
      "type": "push|pull|leg|full",
      "exercises": [
        {
          "exercise_id": 0,
          "sets": [
            { "reps": 0, "weight_in_kg": 0 },
            { "reps": 0, "weight_in_kg": 0 }
          ]
        },
        {
          "exercise_id": 1,
          "sets": [
            { "reps": 0, "weight_in_kg": 0 },
            { "reps": 0, "weight_in_kg": 0 }
          ]
        }
      ]
    },
    {
      "date": "2022-08-23T16:00:00Z",
      "plan_name": "Plan Name",
      "type": "push|pull|leg|full",
      "exercises": [
        {
          "exercise_id": 0,
          "sets": [
            { "reps": 0, "weight_in_kg": 0 },
            { "reps": 0, "weight_in_kg": 0 }
          ]
        },
        {
          "exercise_id": 1,
          "sets": [
            { "reps": 0, "weight_in_kg": 0 },
            { "reps": 0, "weight_in_kg": 0 }
          ]
        }
      ]
    }
  ]
}
```
