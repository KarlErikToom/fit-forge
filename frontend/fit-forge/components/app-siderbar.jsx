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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
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
import { useEffect, useState } from "react";
import ApiClient from "@/lib/api";
import Link from "next/link";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export function AppSidebar() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [clientFirstName, setClientFirstName] = useState("");
  const [clientLastName, setClientLastName] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  const api = new ApiClient();
  async function createClient(e) {
    e.preventDefault();
    try {
      const clientData = {
        firstName: clientFirstName,
        lastName: clientLastName,
        email: clientEmail,
      };
      const res = await api.createClient(clientData);
      setClients(prev => [...prev, res]);


    } catch (error) {}
  }

  useEffect(() => {
    async function fetchClients() {
      try {
        const data = await api.getClients(); // ✅ Use your API client
        setClients(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchClients();
  }, []);
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Clients</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {clients.map((client) => (
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
              <SidebarMenuItem >
                <SidebarMenuButton className={"hover:cursor-pointer"}>
                  <Link href={"/exercises"} className="flex items-center">
                    <Dumbbell size={16} />
                    <span className={"ml-2"}> Exercise list</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <Dialog >
                  <DialogTrigger asChild>
                    <SidebarMenuButton className={"hover:cursor-pointer"}>
                      <Plus />
                      <span>Add a client</span>
                    </SidebarMenuButton>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={createClient}>
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
                        <Label htmlFor="email">email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter className={"mt-4"}>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
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
