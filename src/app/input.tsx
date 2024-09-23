// We're using a client component to show a loading state
"use client";

import { useFormStatus } from "react-dom";

export function Input() {
  const { pending } = useFormStatus();

  return (
    <input
      type="text"
      disabled={pending}
      name="username"
      placeholder=""
      defaultValue="Alison"
      required
      // for demo purposes, disabling autocomplete 1password here
      autoComplete="off"
      data-1p-ignore
    />
  );
}
