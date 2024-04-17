import { useState, useEffect } from "react";
import "./App.css";
import CodeEditor from "./components/codeEditor";
import ProblemStatement from "./components/problemStatement";
import TestCase from "./components/testCase";

function App() {
  const [code, setCode] = useState("");

  const [question, setQuestion] = useState("");

  const [testCases, setTestCases] = useState([]);

  useEffect(() => {
    // Fetch data from the server
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/questions");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data);
        setQuestion(data.question);
        setTestCases(data.testCases);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="codeenv">
        {/* All the content of the problem statement and Code editor */}
        <div className="question">
          <ProblemStatement className="Statement" problemStatement={question} />
          <hr />
          <TestCase className="Testcase" testCase={testCases} />
        </div>
        <div className="solution">
          <CodeEditor value={code} onChange={setCode} />
        </div>
      </div>
    </div>
  );
}

export default App;
