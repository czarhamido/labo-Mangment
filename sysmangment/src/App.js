import "./App.css";
import TableClient from "./components/client/TableClient";
import Nav from "./components/NavLabo";
import TableAnalyse from "./components/analyse/TableAnalyse";
import {   BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route exact  path="/" element={<TableClient />} />

          <Route exact path="/analyse" element={<TableAnalyse />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
