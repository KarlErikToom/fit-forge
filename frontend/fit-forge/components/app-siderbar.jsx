"use client";
import { Plus, User2, ChevronUp, Dumbbell } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState, useRef } from "react";
import ApiClient from "@/lib/api";
import Link from "next/link";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useClients } from "@/context/ClientContext";
import { Fallback } from "@radix-ui/react-avatar";

export function AppSidebar() {
  const { clients, loading, error, addClient } = useClients();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [clientFirstName, setClientFirstName] = useState("");
  const [clientLastName, setClientLastName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientType, setClientType] = useState("");
  const [clientWeight, setClientWeight] = useState("");
  const [clientGoalWeight, setClientGoalWeight] = useState("");

  const dialogCloseRef = useRef(null);
  const api = new ApiClient();

  const clearForm = () => {
    setClientFirstName("");
    setClientLastName("");
    setClientEmail("");
    setClientType("");
    setClientWeight("");
    setClientGoalWeight("");
  };

   async function handleCreateClient(e) {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const clientData = {
        firstName:clientFirstName,
        lastName:clientLastName,
        email:clientEmail,
        type:clientType,
        currentWeight: parseFloat(clientWeight) || 0,
        goalWeight: parseFloat(clientGoalWeight) || 0
      }

      await addClient(clientData)

      clearForm();
      setIsDialogOpen(false)
    } catch (error) {
            console.error("Failed to create client:", error);
    } finally{
            setIsSubmitting(false);
    }
   }


  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Clients</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {loading ? (
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <span>Loading...</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : error ? (
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <span>Error loading clients</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : clients.map((client) => (
                <SidebarMenuItem key={client._id}>
                  <SidebarMenuButton asChild>
                    <Link href={`/clients/${client._id}`}>
                      <span>
                        {client.firstName} {client.lastName}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="hover:cursor-pointer">
                  <Link href="/exercises" className="flex items-center">
                    <Dumbbell size={16} />
                    <span className="ml-2">Exercise list</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <SidebarMenuButton className="hover:cursor-pointer">
                    <Plus />
                    <span>Add a client</span>
                  </SidebarMenuButton>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <form onSubmit={handleCreateClient}>
                    <DialogHeader>
                      <DialogTitle>Add client</DialogTitle>
                      <DialogDescription>
                        Create a new client so you can start tracking their
                        workouts, make sure the information is correct
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div className="grid gap-3">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          required
                          value={clientFirstName}
                          onChange={(e) => setClientFirstName(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={clientLastName}
                          required
                          onChange={(e) => setClientLastName(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="type">Client Type</Label>
                        <Select
                          value={clientType}
                          onValueChange={setClientType}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Types</SelectLabel>
                              <SelectItem value="inPerson">In Person</SelectItem>
                              <SelectItem value="online">Online</SelectItem>
                              <SelectItem value="hybrid">Hybrid</SelectItem>
                              <SelectItem value="bodybuilding">Bodybuilding</SelectItem>
                              <SelectItem value="powerlifting">Powerlifting</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="grid gap-2">
                          <Label htmlFor="weight">Current Weight (kg)</Label>
                          <Input
                            id="weight"
                            name="weight"
                            type="number"
                            min="0"
                            step="0.1"
                            required
                            value={clientWeight}
                            onChange={(e) => setClientWeight(e.target.value)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="goalWeight">Goal Weight (kg)</Label>
                          <Input
                            id="goalWeight"
                            name="goalWeight"
                            type="number"
                            min="0"
                            step="0.1"
                            required
                            value={clientGoalWeight}
                            onChange={(e) => setClientGoalWeight(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter className="mt-4">
                      <DialogClose ref={dialogCloseRef} asChild>
                        <Button type="button" variant="outline" onClick={clearForm}>
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[var(--sidebar-width)] rounded-md border bg-white shadow-md p-2"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}