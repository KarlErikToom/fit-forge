"use client";

export const Client = {
  id: "",
  firstName: "",
  lastName:"",
  email: "",
};

// Column definitions
export const columns = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
    {
    accessorKey: "lastName",
    header: "Last Name",
  },
 
  {
    accessorKey: "email",
    header: "Email",
  },
   {
    accessorKey: "type",
    header: "Type",
  },
   {
    accessorKey: "currentWeight",
    header: "Current Weight",
  }, {
    accessorKey: "goalWeight",
    header: "Goal Weight",
  },{
    accessorKey: "nextWorkout",
    header: "Next Workout",
  },


];
