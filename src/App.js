import React from "react";
import Timer from "./components/Timer/Timer";
import './app.css'
import CenteredDiv from "./components/CenteredDiv/CenteredDiv";

export default function App() {
  return (
    <CenteredDiv>
      <Timer/>
    </CenteredDiv>
  );
}
