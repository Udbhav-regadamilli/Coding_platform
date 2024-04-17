import React, { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-github_dark";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "./codeEditor.css";

import arrow from "../assests/down-arrow.png";

function CodeEditor({ value, onChange }) {
  const [selectedLanguage, setSelectedLanguage] = useState("java"); // Initial selected language
  const [output, setOutput] = useState();
  const [showOutput, setShowOutput] = useState(false);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const toggle = () => {
    setShowOutput(showOutput ? false : true);
  };

  const handleRunCode = async () => {
    if (value.trim() === "") {
      alert("Code editor is empty. Please enter some code.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: value,
          language: selectedLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      setOutput(responseData.output);
      setShowOutput(true);
      alert(responseData.msg);

    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  return (
    <div className="Code">
      <div className="head">
        <p style={{fontSize: "18px"}}>Editor</p>
        <select
          className="lang"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          <option value="java">Java</option>
          <option value="cpp">Cpp</option>
          <option value="javascript">JS</option>
          <option value="python">Python</option>
        </select>
      </div>

      <AceEditor
        key={selectedLanguage} // Force remount when language changes
        mode={selectedLanguage}
        theme="github_dark"
        fontSize={18}
        onChange={onChange}
        value={value}
        className="code-editor"
        width="100%"
      />

      <div className="output">
        <div className="output-head">
          <h3 onClick={toggle}>
            Output:{" "}
            <img
              src={arrow}
              alt=""
              width={30}
              height={30}
              className={showOutput ? "rotate" : ""}
            />
          </h3>
          <div>
            <button type="submit" onClick={handleRunCode}>
              Run
            </button>
            <button type="submit">Submit</button>
          </div>
        </div>
        { output != null && showOutput && <p>{output}</p>}
      </div>
    </div>
  );
}

export default CodeEditor;
