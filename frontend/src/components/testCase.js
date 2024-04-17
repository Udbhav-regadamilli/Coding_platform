import React from "react";

function TestCase({ testCase }) {
  return (
    <div>
      {testCase.map((item, index) => (
        <div key={index}>
          <h3>Test Case: {index+1}</h3>
          <p>
            <b>Input:</b> {item.input}
          </p>
          <p>
            <b>Output:</b> {item.output}
          </p>
        </div>
      ))}
    </div>
  );
}

export default TestCase;
