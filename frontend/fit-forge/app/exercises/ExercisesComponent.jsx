"use client";

import ApiClient from "@/lib/api";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useMemo } from "react";

export function ExercisesComponent() {
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const api = new ApiClient();

  useEffect(() => {
    async function fetchExercises() {
      try {
        const data = await api.getExercises();
        setExercises(data.exercises || []);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchExercises();
  }, []);

  // Group by muscleGroup
  const groupedExercises = useMemo(() => {
    return exercises.reduce((groups, exercise) => {
      const group = exercise.category || "Other";
      if (!groups[group]) groups[group] = [];
      groups[group].push(exercise);
      return groups;
    }, {});
  }, [exercises]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (exercises.length === 0) return <p>No exercises found</p>;

  return (
    <>
      {Object.entries(groupedExercises).map(([muscleGroup, exList]) => (
        <div key={muscleGroup} className="mb-6">
          <h2 className="text-lg font-bold mb-2">{muscleGroup}</h2>
          <div className="flex flex-wrap">
            {exList.map((exercise) => (
              <Card
                className="w-[240px] max-w-sm m-2"
                key={exercise._id}
              >
                <CardHeader className="items-center justify-center">
                  <CardTitle className="flex items-center justify-center">
                    <Avatar className="flex flex-col items-center justify-center w-20 h-20">
                      <AvatarImage
                        src="https://github.com/evilrabbit.png"
                        alt={exercise.name}
                      />
                      <AvatarFallback>EX</AvatarFallback>
                    </Avatar>
                  </CardTitle>
                  <CardDescription>{exercise.name}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

