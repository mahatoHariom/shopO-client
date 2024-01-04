"use client";
import * as React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ApolloWrapper } from "@/lib/apollo-wrapper";
export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <ApolloWrapper>
      {" "}
      {children}
      </ApolloWrapper>
     
    </ThemeProvider>
  );
}
