const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 模擬時段資料
const scheduleData = ["09:00-10:00", "10:00-11:00", "11:00-12:00"];

// 模擬學生資料
const studentData = {
    "09:00-10:00": [{ name: "Alice" }, { name: "Bob" }],
    "10:00-11:00": [{ name: "Charlie" }, { name: "David" }],
    "11:00-12:00": [{ name: "Eve" }, { name: "Frank" }],
};

// API：獲取時段
app.get("/api/schedule", (req, res) => {
    res.json(scheduleData);
});

// API：根據時段獲取學生
app.get("/api/students", (req, res) => {
    const { time } = req.query;
    res.json(studentData[time] || []);
});

// 啟動伺服器
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
