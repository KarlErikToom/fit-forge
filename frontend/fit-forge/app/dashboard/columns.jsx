"use client";

export const Client = {
  id: "",
  firstName: "",
  lastName:"",
  amount: 0,
  status: "pending",
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
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
