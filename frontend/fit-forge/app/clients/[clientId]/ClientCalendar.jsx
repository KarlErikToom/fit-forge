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
  const [creatingWorkout, setCreatingWorkout] = useState(false);
  
  const api = new ApiClient();
const getWorkoutsForDate = async (date, clientId) => {
  setLoadingWorkouts(true);
  try {
    const allWorkouts = await api.getWorkouts(clientId);
    
    const selectedDateString = format(date, 'yyyy-MM-dd');
   
    console.log("Selected date (local):", selectedDateString);
   
    const dateWorkouts = allWorkouts.filter(workout => {
      const workoutDateString = workout.date.substring(0, 10); // Just the date part
      return workout.clientId === clientId && workoutDateString === selectedDateString;
    });
   
    console.log("Filtered dateWorkouts:", dateWorkouts);
    setWorkouts(dateWorkouts);
  } catch (error) {
    console.error("Failed to fetch workouts:", error);
    setWorkouts([]);
  } finally {
    setLoadingWorkouts(false);
  }
};
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    if (date) {
      getWorkoutsForDate(date, clientId);
    }
  };

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
        date: format(selectedDate, "yyyy-MM-dd"),
      };

      const newWorkout = await api.createWorkout(clientId, workoutData);
      
      setWorkouts(prev => [...prev, newWorkout]);
      
      setWorkoutName("");
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
                  <Card key={workout._id}>
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