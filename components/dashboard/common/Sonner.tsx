"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

interface SonnerProps {
  text: string;
  action?: string;
}

export function Sonner({ text, action }: SonnerProps) {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast(text, {
          description: action,
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
    >
      Show Toast
    </Button>
  );
}
