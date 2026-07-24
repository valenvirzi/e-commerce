"use client";

import { UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserRole } from "@/hooks/use-user-role";

export function UserRoleSwitcher() {
  const { user, setRole } = useUserRole();

  return (
    <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-300">
        <UserRound className="size-4" />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-medium leading-tight text-slate-950 dark:text-white">
          {user.name}
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {user.email}
        </div>
      </div>
      <Badge variant="outline" className="ml-auto shrink-0">
        {user.role}
      </Badge>
      <Select
        value={user.role}
        onValueChange={(value) => setRole(value as "B2C" | "B2B")}
      >
        <SelectTrigger className="w-24 shrink-0">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="B2C">B2C</SelectItem>
          <SelectItem value="B2B">B2B</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
