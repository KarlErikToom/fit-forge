"use client";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import ApiClient from "@/lib/api";
import { format } from "date-fns";
import { Plus, Dumbbell } from "lucide-react";

export default function ClientCalendar({ client, clientId }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [workouts, setWorkouts] = useState([]);
  const [loadingWorkouts, setLoadingWorkouts] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");
  const [workoutDuration, setWorkoutDuration] = useState("");
  const [creatingWorkout, setCreatingWorkout] = useState(false);
  
  const api = new ApiClient();

  // Get workouts for the selected date
  const getWorkoutsForDate = async (date, clientId) => {
    setLoadingWorkouts(true);
    try {
      // You might need to modify your API to accept date filtering
      // For now, get all workouts and filter by date
      const allWorkouts = await api.getWorkouts();
      const dateString = format(date, "yyyy-MM-dd");
      
      // Filter workouts for this client and date
      const dateWorkouts = allWorkouts.filter(workout => 
        workout.clientId === clientId && 
        workout.date === dateString
      );
      
      setWorkouts(dateWorkouts);
    } catch (error) {
      console.error("Failed to fetch workouts:", error);
      setWorkouts([]);
    } finally {
      setLoadingWorkouts(false);
    }
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    if (date) {
      getWorkoutsForDate(date, clientId);
    }
  };

  // Load workouts for initial date
  useEffect(() => {
    if (selectedDate && clientId) {
      getWorkoutsForDate(selectedDate, clientId);
    }
  }, [clientId]);

  const createWorkout = async (e) => {
    e.preventDefault();
    
    if (!workoutName.trim()) {
      alert("Please enter a workout name");
      return;
    }

    setCreatingWorkout(true);
    
    try {
      const workoutData = {
        name: workoutName,
        description: workoutDescription,
        date: format(selectedDate, "yyyy-MM-dd"),
        duration: workoutDuration ? parseInt(workoutDuration) : null,
        exercises: [],
      };

      const newWorkout = await api.createWorkout(clientId, workoutData);
      
      // Add new workout to the list
      setWorkouts(prev => [...prev, newWorkout]);
      
      // Reset form and close dialog
      setWorkoutName("");
      setWorkoutDescription("");
      setWorkoutDuration("");
      setIsDialogOpen(false);
      
    } catch (error) {
      console.error("Failed to create workout:", error);
      alert("Failed to create workout. Please try again.");
    } finally {
      setCreatingWorkout(false);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setWorkoutName("");
    setWorkoutDescription("");
    setWorkoutDuration("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {/* Calendar Section */}
      <div>
        <div className="mb-4">
          <h1 className="text-2xl font-bold">
            {client?.firstName} {client?.lastName}'s Workouts
          </h1>
          <p className="text-gray-600">Select a date to view or create workouts</p>
        </div>

        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          className="rounded-md border shadow-sm"
        />
      </div>

      {/* Workouts Section */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">
            {selectedDate && format(selectedDate, "MMMM d, yyyy")}
          </h2>
          <p className="text-gray-600">
            {loadingWorkouts ? "Loading workouts..." : `${workouts.length} workout(s)`}
          </p>
        </div>

        {loadingWorkouts ? (
          <div className="flex items-center justify-center h-32">
            <div>Loading workouts...</div>
          </div>
        ) : (
          <div className="space-y-4">
            {workouts.length > 0 ? (
              <>
                {workouts.map((workout) => (
                  <Card key={workout.id}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Dumbbell className="h-5 w-5" />
                        {workout.name}
                      </CardTitle>
                      {workout.duration && (
                        <CardDescription>
                          Duration: {workout.duration} minutes
                        </CardDescription>
                      )}
                    </CardHeader>
                    {workout.description && (
                      <CardContent>
                        <p className="text-sm text-gray-600">{workout.description}</p>
                      </CardContent>
                    )}
                  </Card>
                ))}
                
                {/* Add Another Workout Button */}
                <Button 
                  onClick={() => setIsDialogOpen(true)}
                  variant="outline" 
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Workout
                </Button>
              </>
            ) : (
              /* No Workouts - Show Create Button */
              <div className="text-center py-8">
                <div className="mb-4">
                  <Dumbbell className="h-12 w-12 mx-auto text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No workouts scheduled
                </h3>
                <p className="text-gray-600 mb-4">
                  Create a workout for {selectedDate && format(selectedDate, "MMMM d, yyyy")}
                </p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Workout
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create Workout Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Workout</DialogTitle>
            <DialogDescription>
              Create a new workout for {selectedDate && format(selectedDate, "MMMM d, yyyy")}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={createWorkout} className="space-y-4">
            <div>
              <Label htmlFor="workoutName">Workout Name *</Label>
              <Input
                id="workoutName"
                type="text"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                placeholder="e.g., Upper Body Strength"
                required
              />
            </div>

            

            <div>
              <Label htmlFor="workoutDuration">Duration (minutes)</Label>
              <Input
                id="workoutDuration"
                type="number"
                value={workoutDuration}
                onChange={(e) => setWorkoutDuration(e.target.value)}
                placeholder="e.g., 60"
                min="1"
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleDialogClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={creatingWorkout}>
                {creatingWorkout ? "Creating..." : "Create Workout"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}