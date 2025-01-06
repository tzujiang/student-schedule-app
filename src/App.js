import React, { useState } from "react";
import "./App.css";

function ScheduleApp() {
  // 統一的資料結構
  const scheduleData = {
    "星期一": {
      "01:30-03:30": {
        teachers: ["B3 11 Monica", "A1 12 Angela", "A3 21 Joanne"],
        students: {
          "B3 11 Monica": ["1張維芯", "1李祈亨", "1李昱霆", "1鄭文閎", "1莊凱均", "1蔡典倫", "1陳定宥", "1洪逸博", "1楊采臻", "1褚艾瑪"],
          "A1 12 Angela": ["2黃柏誠", "2陳品妡", "2潘秉軒", "2甘采庭", "2朱宣伃", "2許歆媛", "2李昱慶", "2陳宥晴", "2王俐穎"],
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
  const [checkedStudents, setCheckedStudents] = useState([]);

  // 切換日、時段或老師時重置勾選狀態
  const handleSelectionChange = (type, value) => {
    setCheckedStudents([]);
    if (type === "day") {
      setSelectedDay(value);
      setSelectedTime(Object.keys(scheduleData[value])[0]);
      setSelectedTeacher(
        Object.keys(scheduleData[value][Object.keys(scheduleData[value])[0]])[0]
      );
    } else if (type === "time") {
      setSelectedTime(value);
      setSelectedTeacher(Object.keys(scheduleData[selectedDay][value])[0]);
    } else if (type === "teacher") {
      setSelectedTeacher(value);
    }
  };

  // 勾選框變更
  const handleCheckboxChange = (student) => {
    setCheckedStudents((prev) => {
      if (prev.includes(student)) {
        return prev.filter((s) => s !== student);
      } else {
        return [...prev, student];
      }
    });
  };

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
              onClick={() => handleSelectionChange("day", day)}
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
                onClick={() => handleSelectionChange("time", time)}
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
                  onClick={() => handleSelectionChange("teacher", teacher)}
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
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkedStudents.includes(student)}
                      onChange={() => handleCheckboxChange(student)}
                    />
                    {student}
                  </label>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ScheduleApp;