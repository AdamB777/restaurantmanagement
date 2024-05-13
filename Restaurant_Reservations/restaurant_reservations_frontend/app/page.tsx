"use client"
import { Provider } from "react-redux";
import Login from "./(features)/Login/Login";
import { store } from "./utils/redux/store";

export default function Home() {
  return (
    <div>
      <Login />
    </div>
  );
}
