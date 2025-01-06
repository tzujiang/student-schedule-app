import React, { useState } from "react";
import "./App.css";

function ScheduleApp() {
  // 統一的資料結構
  const scheduleData = {
    "星期一": {
      "01:30-03:30": {
        teachers: ["B3 11 Monica", "A1 12 Angela", "A3 21 Joanne"],
        students: {
          "B3 11 Monica": ["學生 1", "學生 2", "學生 3"],
          "A1 12 Angela": ["學生 4", "學生 5"],
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

  // 狀態管理
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [searchText, setSearchText] = useState("");

  return (
    <div className="schedule-app">
      {/* 右上角圖片 */}
      <img
        src="/S__432234521.gif" // 替換為你的圖片網址或相對路徑
        alt="S__432234521.gif"
        className="top-right-image"
      />
      <h1>長頸鹿美語頭前</h1>

      {/* 搜索框 */}
      <div className="search-bar">
        <input
          type="text"
          placeholder=""
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* 選擇禮拜幾 */}
      <div className="weekdays">
        <h2>選擇禮拜幾</h2>
        <ul>
          {Object.keys(scheduleData).map((day, index) => (
            <li
              key={index}
              className={selectedDay === day ? "selected" : ""}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </li>
          ))}
        </ul>
      </div>

      {/* 選擇時段 */}
      {selectedDay && (
        <div className="schedule-list">
          <h2>選擇時段（{selectedDay}）</h2>
          <ul>
            {Object.keys(scheduleData[selectedDay] || {}).map((time, index) => (
              <li
                key={index}
                className={selectedTime === time ? "selected" : ""}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 選擇老師 */}
      {selectedDay && selectedTime && (
        <div className="teacher-list">
          <h2>選擇老師（{selectedDay} {selectedTime}）</h2>
          <ul>
            {(scheduleData[selectedDay]?.[selectedTime]?.teachers || [])
              .filter((teacher) =>
                teacher.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((teacher, index) => (
                <li
                  key={index}
                  className={selectedTeacher === teacher ? "selected" : ""}
                  onClick={() => setSelectedTeacher(teacher)}
                >
                  {teacher}
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* 顯示學生名單 */}
      {selectedDay && selectedTime && selectedTeacher && (
        <div className="student-list">
          <h2>學生名單（{selectedDay} {selectedTime} 老師：{selectedTeacher}）</h2>
          <ul>
            {(scheduleData[selectedDay]?.[selectedTime]?.students?.[selectedTeacher] || [])
              .filter((student) =>
                student.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((student, index) => (
                <li key={index}>{student}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ScheduleApp;