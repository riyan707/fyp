import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "outline"; // Ensure only these values are valid
}

export function Button({ children, variant = "default", ...props }: ButtonProps) {
  const styles: Record<"default" | "outline", string> = {
    default: "bg-green-600 text-white px-4 py-2 rounded",
    outline: "border border-gray-400 px-4 py-2 rounded",
  };

  return (
    <button className={styles[variant ?? "default"]} {...props}>
      {children}
    </button>
  );
}
