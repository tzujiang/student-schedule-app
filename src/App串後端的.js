import React, { useState, useEffect } from "react";
import "./App.css";

function ScheduleApp() {
  // ======== 狀態管理 ========
  const [scheduleData, setScheduleData] = useState({}); // 從後端抓回來的排課資料

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  // 新增用的輸入欄位
  const [newTime, setNewTime] = useState("");
  const [newTeacher, setNewTeacher] = useState("");
  const [newStudent, setNewStudent] = useState("");

  // 搜尋相關
  const [searchText, setSearchText] = useState("");
  const [checkedStudents, setCheckedStudents] = useState([]); // 保留你勾選學生的功能

  // 後端 API URL，可視需求調整 (若部署在其他位址要改成對應的 URL)
  const BASE_URL = "http://localhost:3001/api";

  // =====================================
  // 1) 一進頁面就透過後端 API 取得資料
  // =====================================
  useEffect(() => {
    fetch(`${BASE_URL}/schedule`)
      .then((res) => res.json())
      .then((data) => {
        setScheduleData(data);

        // 預設選第一個 day / time / teacher
        const days = Object.keys(data);
        if (days.length > 0) {
          const firstDay = days[0];
          setSelectedDay(firstDay);

          const times = Object.keys(data[firstDay]);
          if (times.length > 0) {
            const firstTime = times[0];
            setSelectedTime(firstTime);

            const teachers = data[firstDay][firstTime].teachers;
            if (teachers.length > 0) {
              setSelectedTeacher(teachers[0]);
            }
          }
        }
      })
      .catch((err) => console.error("取得排課資料失敗：", err));
  }, []);

  // =====================================
  // 選擇器切換 (Day / Time / Teacher)
  // =====================================
  const handleSelectionChange = (type, value) => {
    // 每次切換都清空已勾選學生
    setCheckedStudents([]);

    if (type === "day") {
      setSelectedDay(value);
      setSelectedTime(null);
      setSelectedTeacher(null);

      // 選新的 day 後，若有時段，就預設選第一個
      const times = Object.keys(scheduleData[value] || {});
      if (times.length > 0) {
        setSelectedTime(times[0]);
        const firstTeacher = scheduleData[value][times[0]].teachers[0] || null;
        setSelectedTeacher(firstTeacher);
      }
    } else if (type === "time") {
      setSelectedTime(value);
      // 選新的 time 後，也預設選第一位老師
      const firstTeacher =
        scheduleData[selectedDay][value].teachers[0] || null;
      setSelectedTeacher(firstTeacher);
    } else if (type === "teacher") {
      setSelectedTeacher(value);
    }
  };

  // =====================================
  // 2) 時段：新增 & 刪除
  // =====================================
  const handleAddTimeSlot = () => {
    if (!selectedDay || !newTime.trim()) return;

    fetch(`${BASE_URL}/schedule/time`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ day: selectedDay, time: newTime }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          // 後端回傳最新的 scheduleData，更新 state
          setScheduleData(result.data);
          setNewTime("");

          // 自動選到新時段
          setSelectedTime(newTime);
          setSelectedTeacher(null);
        } else {
          alert(result.message || "新增時段失敗");
        }
      })
      .catch((err) => console.error("新增時段失敗：", err));
  };

  const handleDeleteTimeSlot = (day, time) => {
    if (!window.confirm(`確定刪除「${day} - ${time}」嗎？`)) return;

    fetch(`${BASE_URL}/schedule/time/${day}/${time}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setScheduleData(result.data);
          // 如果刪掉的正好是你選的時段，就重置
          if (selectedDay === day && selectedTime === time) {
            setSelectedTime(null);
            setSelectedTeacher(null);
          }
        } else {
          alert(result.message || "刪除時段失敗");
        }
      })
      .catch((err) => console.error("刪除時段失敗：", err));
  };

  // =====================================
  // 3) 老師：新增 & 刪除
  // =====================================
  const handleAddTeacher = () => {
    if (!selectedDay || !selectedTime || !newTeacher.trim()) return;

    fetch(`${BASE_URL}/schedule/teacher`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        day: selectedDay,
        time: selectedTime,
        teacherName: newTeacher,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setScheduleData(result.data);
          setNewTeacher("");
          // 自動切換到新老師
          setSelectedTeacher(newTeacher);
        } else {
          alert(result.message || "新增老師失敗");
        }
      })
      .catch((err) => console.error("新增老師失敗：", err));
  };

  const handleDeleteTeacher = (day, time, teacherName) => {
    if (!window.confirm(`確定刪除「${teacherName}」老師嗎？`)) return;

    fetch(`${BASE_URL}/schedule/teacher/${day}/${time}/${teacherName}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setScheduleData(result.data);
          // 若刪除的正好是當前選到的老師，就重置
          if (
            selectedDay === day &&
            selectedTime === time &&
            selectedTeacher === teacherName
          ) {
            setSelectedTeacher(null);
          }
        } else {
          alert(result.message || "刪除老師失敗");
        }
      })
      .catch((err) => console.error("刪除老師失敗：", err));
  };

  // =====================================
  // 4) 學生：新增 & 刪除
  // =====================================
  const handleAddStudent = () => {
    if (!selectedDay || !selectedTime || !selectedTeacher || !newStudent.trim())
      return;

    fetch(`${BASE_URL}/schedule/student`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        day: selectedDay,
        time: selectedTime,
        teacherName: selectedTeacher,
        studentName: newStudent,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setScheduleData(result.data);
          setNewStudent("");
        } else {
          alert(result.message || "新增學生失敗");
        }
      })
      .catch((err) => console.error("新增學生失敗：", err));
  };

  const handleDeleteStudent = (day, time, teacherName, studentName) => {
    if (!window.confirm(`確定刪除學生「${studentName}」嗎？`)) return;

    fetch(
      `${BASE_URL}/schedule/student/${day}/${time}/${teacherName}/${studentName}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setScheduleData(result.data);
        } else {
          alert(result.message || "刪除學生失敗");
        }
      })
      .catch((err) => console.error("刪除學生失敗：", err));
  };

  // =====================================
  // 5) 學生打勾 (只是做前端 UI 勾選示範)
  // =====================================
  const handleCheckboxChange = (student) => {
    setCheckedStudents((prev) => {
      if (prev.includes(student)) {
        return prev.filter((s) => s !== student);
      } else {
        return [...prev, student];
      }
    });
  };

  // =====================================
  //             畫面渲染區
  // =====================================
  return (
    <div className="schedule-app">
      {/* 右上角圖片 */}
      <img
        src="/S__432234521.gif" // 替換為你的圖片網址或相對路徑
        alt="S__432234521.gif"
        className="top-right-image"
      />
      <h1>長頸鹿美語頭前</h1>

      {/* 搜尋框 */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="搜尋老師或學生"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* 禮拜幾列表 */}
      <div className="weekdays">
        <h2>選擇禮拜幾</h2>
        <ul>
          {Object.keys(scheduleData).map((day) => (
            <li
              key={day}
              className={selectedDay === day ? "selected" : ""}
              onClick={() => handleSelectionChange("day", day)}
            >
              {day}
            </li>
          ))}
        </ul>
      </div>

      {/* 時段列表 */}
      {selectedDay && scheduleData[selectedDay] && (
        <div className="schedule-list">
          <h2>
            時段（{selectedDay}）
            <div style={{ marginTop: "10px" }}>
              <input
                type="text"
                placeholder="例如 07:00-08:00"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              />
              <button onClick={handleAddTimeSlot}>新增時段</button>
            </div>
          </h2>

          <ul>
            {Object.keys(scheduleData[selectedDay]).map((time) => (
              <li
                key={time}
                className={selectedTime === time ? "selected" : ""}
                onClick={() => handleSelectionChange("time", time)}
              >
                {time}
                {/* 刪除時段按鈕 */}
                <button
                  style={{ marginLeft: 8 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTimeSlot(selectedDay, time);
                  }}
                >
                  刪除
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 老師列表 */}
      {selectedDay &&
        selectedTime &&
        scheduleData[selectedDay] &&
        scheduleData[selectedDay][selectedTime] && (
          <div className="teacher-list">
            <h2>
              老師（{selectedDay} {selectedTime}）
              <div style={{ marginTop: "10px" }}>
                <input
                  type="text"
                  placeholder="老師名稱"
                  value={newTeacher}
                  onChange={(e) => setNewTeacher(e.target.value)}
                />
                <button onClick={handleAddTeacher}>新增老師</button>
              </div>
            </h2>
            <ul>
              {scheduleData[selectedDay][selectedTime].teachers
                .filter((teacher) =>
                  teacher.toLowerCase().includes(searchText.toLowerCase())
                )
                .map((teacher) => (
                  <li
                    key={teacher}
                    className={selectedTeacher === teacher ? "selected" : ""}
                    onClick={() => handleSelectionChange("teacher", teacher)}
                  >
                    {teacher}
                    {/* 刪除老師按鈕 */}
                    <button
                      style={{ marginLeft: 8 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTeacher(selectedDay, selectedTime, teacher);
                      }}
                    >
                      刪除
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        )}

      {/* 學生列表 */}
      {selectedDay &&
        selectedTime &&
        selectedTeacher &&
        scheduleData[selectedDay] &&
        scheduleData[selectedDay][selectedTime] &&
        scheduleData[selectedDay][selectedTime].students[selectedTeacher] && (
          <div className="student-list">
            <h2>
              學生（{selectedDay} {selectedTime} | 老師: {selectedTeacher}）
              <div style={{ marginTop: "10px" }}>
                <input
                  type="text"
                  placeholder="學生名稱"
                  value={newStudent}
                  onChange={(e) => setNewStudent(e.target.value)}
                />
                <button onClick={handleAddStudent}>新增學生</button>
              </div>
            </h2>
            <ul>
              {scheduleData[selectedDay][selectedTime].students[selectedTeacher]
                .filter((student) =>
                  student.toLowerCase().includes(searchText.toLowerCase())
                )
                .map((student) => (
                  <li key={student}>
                    <label>
                      <input
                        type="checkbox"
                        checked={checkedStudents.includes(student)}
                        onChange={() => handleCheckboxChange(student)}
                      />
                      {student}
                    </label>
                    {/* 刪除學生按鈕 */}
                    <button
                      style={{ marginLeft: 8 }}
                      onClick={() =>
                        handleDeleteStudent(
                          selectedDay,
                          selectedTime,
                          selectedTeacher,
                          student
                        )
                      }
                    >
                      刪除
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        )}
    </div>
  );
}

export default ScheduleApp;
