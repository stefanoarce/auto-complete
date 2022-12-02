import React from "react";
import { createRoot } from "react-dom/client";
import AutoComplete from "./components/AutoComplete";
import "./index.css";

const container = document.getElementById("app-root")!;
const root = createRoot(container);
root.render(
  <>
    <h1>Autocomplete</h1>
    <AutoComplete />
  </>
);
