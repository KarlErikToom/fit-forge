const API_BASE_URL = process.env.NEXT_API_URL || "http://localhost:3000/api";

class ApiClient {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include",
      ...options,
    };

    if (config.body && typeof config.body !== "string") {
      config.body = JSON.stringify(config.body);
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      if (response.status === 401) {
        Cookies.remove("token");
      }
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
  }

  ///CLIENT ROUTES
  getClients() {
    return this.request("/clients");
  }
  getClient(id) {
    return this.request(`/clients/${id}`);
  }
  createClient(clientData) {
    return this.request(`/clients`, {
      method: "POST",
      body: clientData,
    });
  }
  deleteClient() {
    return this.request(`/clients/${id}`, {
      method: "DELETE",
    });
  }

  //CLIENT WORKOUT ROUTES

  getWorkouts() {
    return this.request(`/clients/workouts`);
  }

  getWorkout(clientId, workoutId) {
    return this.request(`/clients/${clientId}/${workoutId}`);
  }
  createWorkout(clientId, workoutData) {
    return this.request(`/clients/${clientId}/workouts`, {
      method: "POST",
      body: workoutData,
    });
  }

  updateWorkout(clientId, workoutId, workoutData) {
    return this.request(`/clients/${clientId}/workouts/${workoutId}`, {
      method: "PATCH",
      body: workoutData,
    });
  }

  deleteWorkout(clienId, workoutId) {
    return this.request(`/clients/${clienId}/workouts/${workoutId}`, {
      method: "DELETE",
    });
  }

  getExercises() {
    return this.request(`/exercises`);
  }
  getExercise(exerciseId) {
    return this.request(`/exercises/${id}`);
  }

  createExercise(exerciseData) {
    return this.request(`/exercises`, {
      method: "POST",
      body: exerciseData,
    });
  }

  updateExercise(exerciseId, exerciseData) {
    return this.request(`/exercises/${exerciseId}`, {
      method: "PATCH",
      body: exerciseData,
    });
  }
  deleteExercise(exerciseId) {
    return this.request(`/exercises/${exerciseId}`, {
      method: "DELETE",
    });
  }
}

export default ApiClient;