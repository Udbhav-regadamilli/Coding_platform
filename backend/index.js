const express = require("express");
const { spawn } = require("child_process");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.static(path.join(__dirname, "build")));

// Handle requests to the root endpoint
app.get("/", (req, res) => {
  // Send the HTML file that serves the React application
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/questions", (req, res) => {
  res.json({
    question: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. \n
    You may assume that each input would have exactly one solution, and you may not use the same element twice.
    You can return the answer in any order.`,
    testCases: [
      { input: "hello", output: "olleh" },
      { input: "hero", output: "oreh" },
    ],
  });
});

app.post("/run", (req, res) => {
  const { code, language } = req.body;
  console.log(code);

  // Map language to file extension
  const fileExtensions = {
    java: "java",
    cpp: "cpp",
    javascript: "js",
    python: "py",
  };

  const command = {
    java: "java",
    cpp: "gcc",
    javascript: "node",
    python: "python",
  };

  // Write code to a temporary file
  const fileName = `temp.${fileExtensions[language]}`;
  require("fs").writeFileSync(fileName, code);

  const childProcess = spawn(command[language], [fileName]);

  // Write input to the child process stdin
  childProcess.stdin.write("hello");
  childProcess.stdin.end(); // End the input stream

  // Capture output from the child process
  let output = "";
  childProcess.stdout.on("data", (data) => {
    output += data.toString();
  });

  // Handle errors
  childProcess.on("error", (error) => {
    console.error("Error:", error);
  });

  // Handle process exit
  childProcess.on("exit", (code) => {
    if (code === 0) {
      console.log("Child process exited successfully");
      res.json({ output: output, msg: "Test cases passed" });
      console.log("Output:", output);
    } else {
      console.error("Child process exited with code:", code);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
