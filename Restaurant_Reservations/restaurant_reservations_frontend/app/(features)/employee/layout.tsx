import { Karla } from "next/font/google";
import "../../globals.css";
import { Metadata } from "next";
import Pagewrapper from "@/components/pagewrapper";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

const karla = Karla({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-karla",
});

export const metadata: Metadata = {
  title: "Employee menu",
  description: "",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
    <Sidebar></Sidebar>
    <Header></Header>
      <Pagewrapper>{children}</Pagewrapper>
    </div>
  );
}
