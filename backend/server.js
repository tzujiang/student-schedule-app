// backend/server.js
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001; // 你可以換成你喜歡的 port

app.use(cors());
app.use(express.json());

// ====== 初始排課資料 (存在記憶體) ======
let scheduleData = {
  "星期一": {
    "01:30-03:30": {
      teachers: ["B3 11 Monica", "A1 12 Angela", "A3 21 Joanne"],
      students: {
        "B3 11 Monica": [
          "1張維芯", "1李祈亨", "1李昱霆", 
          "1鄭文閎", "1莊凱均", "1蔡典倫",
          "1陳定宥", "1洪逸博", "1楊采臻", "1褚艾瑪"
        ],
        "A1 12 Angela": [
          "2黃柏誠", "2陳品妡", "2潘秉軒", 
          "2甘采庭", "2朱宣伃", "2許歆媛",
          "2李昱慶", "2陳宥晴", "2王俐穎"
        ],
        "A3 21 Joanne": ["學生 6", "學生 7", "學生 8"],
      },
    },
    "04:30-06:30": {
      teachers: ["A+ 11 Angela", "G2 12 Emma", "B2 21 Ivy"],
      students: {
        "A+ 11 Angela": ["學生 9", "學生 10"],
        "G2 12 Emma": ["學生 11", "學生 12"],
        "B2 21 Ivy": [],
      },
    },
    "06:30-08:30": {
      teachers: ["F1 21 Ivy"],
      students: {
        "F1 21 Ivy": [],
      },
    },
  },
  "星期二": {
    "04:30-05:30": {
      teachers: ["B3 11 Monica", "A1 12 Angela", "A3 21 Joanne"],
      students: {
        "B3 11 Monica": [],
        "A1 12 Angela": [],
        "A3 21 Joanne": [],
      },
    },
    "05:30-06:30": {
      teachers: ["A+ 11 Angela", "G2 12 Emma", "B2 21 Ivy"],
      students: {
        "A+ 11 Angela": [],
        "G2 12 Emma": [],
        "B2 21 Ivy": [],
      },
    },
    "06:30-07:30": {
      teachers: ["F1 21 Ivy"],
      students: {
        "F1 21 Ivy": [],
      },
    },
  },
  "星期三": {
    "01:30-03:30": {
      teachers: ["F2 11 Ivy", "A2 12 Emma", "G1 21 Joanne"],
      students: {
        "F2 11 Ivy": [],
        "A2 12 Emma": [],
        "G1 21 Joanne": [],
      },
    },
    "03:30-04:30": {
      teachers: ["B3 12 外T"],
      students: {
        "B3 12 外T": [],
      },
    },
    "04:30-06:30": {
      teachers: ["G+ 11 Emma", "B1 12 Joanne", "E1 21 Nancy"],
      students: {
        "G+ 11 Emma": [],
        "B1 12 Joanne": [],
        "E1 21 Nancy": [],
      },
    },
    "06:30-07:30": {
      teachers: ["G2 12 外T"],
      students: {
        "G2 12 外T": [],
      },
    },
    "06:30-09:00": {
      teachers: ["國美 21 Nancy"],
      students: {
        "國美 21 Nancy": [],
      },
    },
  },
  "星期四": {
    "01:30-03:30": {
      teachers: ["B3 11 Monica", "A1 12 Angela", "A3 21 Joanne"],
      students: {
        "B3 11 Monica": ["學生 13", "學生 14"],
        "A1 12 Angela": ["學生 15"],
        "A3 21 Joanne": ["學生 16", "學生 17"],
      },
    },
    "04:30-06:30": {
      teachers: ["A+ 11 Angela", "G2 12 Emma", "B2 21 Ivy"],
      students: {
        "A+ 11 Angela": ["學生 18", "學生 19"],
        "G2 12 Emma": ["學生 20"],
        "B2 21 Ivy": [],
      },
    },
    "06:30-08:30": {
      teachers: ["F1 21 Ivy"],
      students: {
        "F1 21 Ivy": [],
      },
    },
  },
  "星期五": {
    "01:30-03:30": {
      teachers: ["F2 11 Ivy", "A2 12 Emma", "G1 21 Joanne"],
      students: {
        "F2 11 Ivy": [],
        "A2 12 Emma": [],
        "G1 21 Joanne": [],
      },
    },
    "04:30-06:30": {
      teachers: ["G+ 11 Emma", "B1 12 Joanne", "E1 21 Nancy"],
      students: {
        "G+ 11 Emma": [],
        "B1 12 Joanne": [],
        "E1 21 Nancy": [],
      },
    },
  },
};

// ==============================================
// ===============    路由設計    ===============
// ==============================================

/**
 * 1) 取得「整包」排課資料
 *    GET /api/schedule
 */
app.get("/api/schedule", (req, res) => {
  res.json(scheduleData);
});

/**
 * 2) 一次「整包」更新排課資料
 *    PUT /api/schedule
 *    body: { ...整個新 scheduleData... }
 */
app.put("/api/schedule", (req, res) => {
  // 直接整包覆蓋
  scheduleData = req.body;
  res.json({ success: true, data: scheduleData });
});

/**
 * 3) 新增「時段」
 *    POST /api/schedule/time
 *    body: { day: '星期一', time: '07:00-08:00' }
 */
app.post("/api/schedule/time", (req, res) => {
  const { day, time } = req.body;
  if (!day || !time) {
    return res
      .status(400)
      .json({ success: false, message: "請提供 day 和 time" });
  }
  // day 不存在
  if (!scheduleData[day]) {
    return res
      .status(400)
      .json({ success: false, message: `找不到 day: ${day}` });
  }
  // 該時段已存在
  if (scheduleData[day][time]) {
    return res
      .status(400)
      .json({ success: false, message: `此時段已存在: ${time}` });
  }
  // 新增
  scheduleData[day][time] = {
    teachers: [],
    students: {},
  };
  res.json({ success: true, data: scheduleData });
});

/**
 * 4) 刪除「時段」
 *    DELETE /api/schedule/time/:day/:time
 */
app.delete("/api/schedule/time/:day/:time", (req, res) => {
  const { day, time } = req.params;

  if (!scheduleData[day]) {
    return res
      .status(404)
      .json({ success: false, message: `找不到 day: ${day}` });
  }
  if (!scheduleData[day][time]) {
    return res
      .status(404)
      .json({ success: false, message: `找不到時段: ${time}` });
  }

  // 刪除該時段
  delete scheduleData[day][time];
  res.json({ success: true, data: scheduleData });
});

/**
 * 5) 新增「老師」
 *    POST /api/schedule/teacher
 *    body: { day, time, teacherName }
 */
app.post("/api/schedule/teacher", (req, res) => {
  const { day, time, teacherName } = req.body;
  if (!day || !time || !teacherName) {
    return res
      .status(400)
      .json({ success: false, message: "請提供 day, time, teacherName" });
  }
  if (!scheduleData[day]) {
    return res.status(404).json({ success: false, message: `找不到 day: ${day}` });
  }
  if (!scheduleData[day][time]) {
    return res
      .status(404)
      .json({ success: false, message: `找不到時段: ${time}` });
  }

  const timeSlot = scheduleData[day][time];
  if (timeSlot.teachers.includes(teacherName)) {
    return res
      .status(400)
      .json({ success: false, message: `老師已存在：${teacherName}` });
  }

  // 新增老師
  timeSlot.teachers.push(teacherName);
  // 在 students 裡也要新增空陣列
  timeSlot.students[teacherName] = [];
  res.json({ success: true, data: scheduleData });
});

/**
 * 6) 刪除「老師」
 *    DELETE /api/schedule/teacher/:day/:time/:teacher
 */
app.delete("/api/schedule/teacher/:day/:time/:teacher", (req, res) => {
  const { day, time, teacher } = req.params;
  if (!scheduleData[day]) {
    return res.status(404).json({ success: false, message: `day 不存在: ${day}` });
  }
  if (!scheduleData[day][time]) {
    return res
      .status(404)
      .json({ success: false, message: `時段不存在: ${time}` });
  }

  const timeSlot = scheduleData[day][time];
  if (!timeSlot.teachers.includes(teacher)) {
    return res
      .status(404)
      .json({ success: false, message: `老師不存在: ${teacher}` });
  }

  // 1) 從 teachers 陣列移除
  timeSlot.teachers = timeSlot.teachers.filter((t) => t !== teacher);
  // 2) 刪除 students 裡該老師的 key
  delete timeSlot.students[teacher];

  res.json({ success: true, data: scheduleData });
});

/**
 * 7) 新增「學生」
 *    POST /api/schedule/student
 *    body: { day, time, teacherName, studentName }
 */
app.post("/api/schedule/student", (req, res) => {
  const { day, time, teacherName, studentName } = req.body;
  if (!day || !time || !teacherName || !studentName) {
    return res.status(400).json({
      success: false,
      message: "請提供 day, time, teacherName, studentName",
    });
  }

  if (!scheduleData[day]) {
    return res.status(404).json({ success: false, message: `找不到 day: ${day}` });
  }
  if (!scheduleData[day][time]) {
    return res
      .status(404)
      .json({ success: false, message: `找不到時段: ${time}` });
  }
  const timeSlot = scheduleData[day][time];
  if (!timeSlot.teachers.includes(teacherName)) {
    return res
      .status(404)
      .json({ success: false, message: `找不到老師: ${teacherName}` });
  }

  // 檢查學生是否已存在
  if (timeSlot.students[teacherName].includes(studentName)) {
    return res
      .status(400)
      .json({ success: false, message: `學生已存在: ${studentName}` });
  }

  // 新增學生
  timeSlot.students[teacherName].push(studentName);
  res.json({ success: true, data: scheduleData });
});

/**
 * 8) 刪除「學生」
 *    DELETE /api/schedule/student/:day/:time/:teacher/:student
 */
app.delete("/api/schedule/student/:day/:time/:teacher/:student", (req, res) => {
  const { day, time, teacher, student } = req.params;
  
  if (!scheduleData[day]) {
    return res.status(404).json({ success: false, message: `day 不存在: ${day}` });
  }
  if (!scheduleData[day][time]) {
    return res
      .status(404)
      .json({ success: false, message: `時段不存在: ${time}` });
  }
  const timeSlot = scheduleData[day][time];
  if (!timeSlot.teachers.includes(teacher)) {
    return res
      .status(404)
      .json({ success: false, message: `老師不存在: ${teacher}` });
  }
  if (!timeSlot.students[teacher].includes(student)) {
    return res
      .status(404)
      .json({ success: false, message: `學生不存在: ${student}` });
  }

  // 移除該學生
  timeSlot.students[teacher] = timeSlot.students[teacher].filter(
    (s) => s !== student
  );

  res.json({ success: true, data: scheduleData });
});

// ==============================================
// ============   啟動 Express 服務   ============
// ==============================================
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
