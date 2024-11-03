import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div>After login Layout{children}</div>;
}
