# Workout API Documentation

## Overview

This API manages workouts for clients and trainers. Trainers can create workouts, add exercises, add sets (reps + weight), update notes, and update existing sets.

---

## Endpoints

### Create Workout

`POST /api/clients/:clientId/workout`

Create a new workout for a client.

**Request Body:**

```json
{
  "date": "2025-08-06T15:00:00Z"
}

Response:

Returns the created workout document.
Update Workout

PATCH /api/clients/:clientId/workout/:workoutId

Update a workout by performing specific actions. Supported actions:
1. Add Exercise

Add a new exercise to the workout.

Request Body:

{
  "action": "addExercise",
  "UserExerciseId": "64c3f5a1d2a3c9f3b4e5d678"
}

2. Add Set

Add a new set (weight and reps) to an existing exercise.

Request Body:

{
  "action": "addSet",
  "exerciseId": "64c3f5a1d2a3c9f3b4e5d678",
  "set": {
    "reps": 10,
    "weight": 45
  }
}

3. Update Notes

Update notes for an exercise.

Request Body:

{
  "action": "updateNotes",
  "exerciseId": "64c3f5a1d2a3c9f3b4e5d678",
  "notes": "Felt strong on this one"
}

4. Update Set

Update a specific set's reps or weight.

Request Body:

{
  "action": "updateSet",
  "exerciseId": "64c3f5a1d2a3c9f3b4e5d678",
  "setId": "64c3f5a1d2a3c9f3b4e5d679",
  "reps": 12,
  "weight": 50
}

Notes

    URL parameters clientId and workoutId are required for updates.

    The authenticated user's trainerId is automatically used for authorization.

    exerciseId and setId refer to MongoDB ObjectIds inside the workout document.

    The API returns the full updated workout document after each successful request.

