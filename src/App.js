import React, { useState } from "react";
import "./App.css";

function ScheduleApp() {
  const [scheduleData, setScheduleData] = useState({
    "星期一": {
      "01:30-03:30": {
        teachers: ["B3 11 Monica", "A1 12 Angela", "A3 21 Joanne"],
        students: {
          "B3 11 Monica": ["1張維芯", "1劉柏毅", "1李祈亨", "1李昱霆", "1鄭文閎", "1莊凱均", "1蔡典倫", "1陳定宥", "1洪逸博", "1楊采臻", "1褚艾瑪"],
          "A1 12 Angela": ["洪亦函 外", "柳宸祐 外", "2黃柏誠", "2陳品妡", "2潘秉軒", "2甘采庭", "2朱宣伃", "2許歆媛", "2李昱慶", "2陳宥晴", "2王俐穎"],
          "A3 21 Joanne": ["何星妍 外", "邱品豐 外", "2林倢羽", "2顏詠芯", "2陳育桓", "2黃麒任", "2徐梓航", "2尤晨皓", "2華研媞"],
        },
      },
      "04:30-06:30": {
        teachers: ["A+ 11 Angela", "G2 12 Emma", "B2 21 Ivy"],
        students: {
          "A+ 11 Angela": ["蘇亮井 外", "江巧恩 外", "林杰良 外", "3林子淳", "3蘇子晴", "3李韋橦", "3邱寶誼", "4蘇柏語", "4黃若蓁", "4傅姿淇"],
          "G2 12 Emma": ["周芷妍 外", "連橙睿 外", "陳予晴 外", "葉麒瑞 外", "侯宇芯 外", "4鐘可崴", "4魏名駿", "4王崇恩", "5楊軒銘", "5陳以靜", "5李心鋆", "5徐可桐"],
          "B2 21 Ivy": ["黃少晴 外", "侯宇謙 外", "駱貞妍 外", "陳虹嶧 外", "1胡晉滕", "1黃詠傑", "1邱重睿", "1吳佳芯", "1廖允瑄", "3吳昕伃", "1李珉赫"],
        },
      },
      "06:30-08:30": {
        teachers: ["F1 21 Ivy"],
        students: {
          "F1 21 Ivy": ["葉佳竹 外", "葉雨姍 外", "張徑綸 外", "謝昊宸 外", "羅荌芝 外", "黃少辰 外", "彭聿廷 外", "4黃椀臨", "5朱梓杰", "5楊士頤", "5林秉亨"],
        },
      },
    },
    "星期二": {
      "04:30-05:30": {
        teachers: ["A1.A+ 11 Peter外", "B1 12 Angeline外", "A1.A+.A2.A3 21 Tito外"],
        students: {
          "A1.A+ 11 Peter外": ["洪亦函 外", "柳宸祐 外", "2黃柏誠", "2陳品妡", "2潘秉軒", "2甘采庭", "2朱宣伃", "2許歆媛", "2李昱慶", "2陳宥晴", "2王俐穎"],
          "B1 12 Angeline外": ["何語恩 外", "王晨芝 外", "吳芯瑜 外", "林芷瀅 外", "2傅祈翔", "2王梓杋", "2黃品竤", "2陳禹彤", "4賴郁樺", "4簡于碩"],
          "A1.A+.A2.A3 21 Tito外": ["邱惠瑜 外", "陳緯謙 外", "邱品豐 外", "3陳宥妡", "3翁葦翔", "3楊晴伊", "3黃椲澄", "4黃舒曼", "4黃苡茞", "4楊苡菲", "3蔡禹樂", "3吳姿頤", "3邱寶誼", "4蘇柏語", "4黃若蓁", "4傅姿淇"],
        },
      },
      "05:30-06:30": {
        teachers: ["A3 11 Peter外", "G1.A+ 12 Angeline外", "B2 21 Tito外"],
        students: {
          "A3 11 Peter外": ["2林倢羽", "2顏詠芯", "2陳育桓", "2黃麒任", "2徐梓航", "2尤晨皓", "2華研媞", "3黃韋橦", "3林子淳", "3蘇子晴"],
          "G1.A+ 12 Angeline外": ["吳于陎 外", "邱佑桓 外", "魏郁芯 外", "江巧恩 外", "3張凱瑜", "3林品佑", "3葉芷安", "3方培先", "3王子洤", "3粘哲睿", "3徐可桐", "3黃翊翔", "3楊庭瑀"],
          "B2 21 Tito外": ["黃少晴 外", "侯宇謙 外", "駱貞妍 外", "陳虹嶧 外", "陳苡蓁 外", "1胡晉滕", "1黃詠傑", "1邱重睿", "1吳佳芯", "1廖允瑄", "3吳昕伃", "1李珉赫"],
        },
      },
      "06:30-07:30": {
        teachers: ["F2.G+ 11 Peter外", "F1.F2 12 Angeline外", "E1 21 Tito外"],
        students: {
          "F2.G+ 11 Peter外": ["翁子喬 外", "吳艾霏 外", "黃子修 外", "4李沛澄", "6王文信", "6黃采婕", "6楊祐銓", "4李思漾", "4蘇畇璋", "4林佳樂"],
          "F1.F2 12 Angeline外": ["張徑綸 外", "謝昊宸 外", "黃少辰 外", "彭聿廷 外", "宋承恩 外", "林杰達 外", "4黃椀臨", "4林忞孜", "4陳重樺", "4林采霓", "4黃品璇", "5朱梓杰", "5楊士頤", "5林秉亨"],
          "E1 21 Tito外": ["梁又心 外", "陳昊謙 外", "趙子媛 外", "吳艾樺 外", "周羽婕 外", "柳采妍 外", "施旻希 外", "6陳翎潔", "6莊炘恩", "6江羽貞", "5許博睿", "5葉姿妍", "5莊秉橙", "5方敏宥", "5賴彥希", "5楊佳霓", "5連楷睿", "5黃韻臻"],
        },
      },
    },
    "星期三": {
      "01:30-03:30": {
        teachers: ["F2 11 Ivy", "A2 12 Emma", "G1 21 Joanne"],
        students: {
          "F2 11 Ivy": ["宋承恩 外", "林杰達 外", "4林忞孜", "4陳重樺", "4林采霓", "4黃品璇", "4李思漾", "4蘇畇璋", "4林佳樂"],
          "A2 12 Emma": ["邱惠瑜 外", "陳緯謙 外", "3陳宥妡", "3翁葦翔", "3楊晴伊", "3黃椲澄", "4黃舒曼", "4黃苡茞", "4楊苡菲", "3蔡禹樂", "3吳姿頤"],
          "G1 21 Joanne": ["吳于陎 外", "邱佑桓 外", "魏郁芯 外", "3張凱瑜", "3林品佑", "3葉芷安", "3方培先", "3王子洤", "3粘哲睿", "3黃翊翔", "3楊庭瑀"],
        },
      },
      "03:30-04:30": {
        teachers: ["B3 12 Tito外"],
        students: {
          "B3 12 Tito外": ["1張維芯", "劉柏毅", "1李祈亨", "1李昱霆", "1鄭文閎", "1莊凱均", "1蔡典倫", "1陳定宥", "1洪逸博", "1楊采臻", "1褚艾瑪"],
        },
      },
      "04:30-06:30": {
        teachers: ["G+ 11 Emma", "B1 12 Joanne", "E1 21 Nancy"],
        students: {
          "G+ 11 Emma": ["翁子喬 外", "藍若珊 外", "藍淳貞 外", "吳艾霏 外", "黃子修 外", "何星岑 外", "4李沛澄", "6王文信", "6黃采婕", "6楊祐銓"],
          "B1 12 Joanne": ["何語恩 外", "王晨芝 外", "吳芯瑜 外", "陳苡蓁 外", "林芷瀅 外", "李子涵 外", "2傅祈翔", "2王梓杋", "2黃品竤", "2陳禹彤", "4賴郁樺", "4簡于碩"],
          "E1 21 Nancy": ["梁又心 外", "陳昊謙 外", "趙子媛 外", "吳艾樺 外", "周羽婕 外", "柳采妍 外", "施旻希 外", "6陳翎潔", "6莊炘恩", "6江羽貞", "5許博睿", "5葉姿妍", "5莊秉橙", "5方敏宥", "5賴彥希", "5楊佳霓", "5連楷睿", "5黃韻臻"],
        },
      },
      "06:30-07:30": {
        teachers: ["G2 12 Tito外"],
        students: {
          "G2 12 Tito外": ["周芷妍 外", "連橙睿 外", "葉麒瑞 外", "侯宇芯 外", "蘇亮井 外", "林杰良 外", "4鐘可崴", "4魏名駿", "4王崇恩", "5楊軒銘", "5陳以靜", "5李心鋆"],
        },
      },
      "06:30-09:00": {
        teachers: ["國美 21 Nancy"],
        students: {
          "國美 21 Nancy": ["連泊睿", "魏茄蓉", "李芷誼", "黃子暘", "詹凱勛", "吳柏諺", "許倖慈", "蘇筠恩", "葉若屏", "葉若妍", "丁姿岑", "施秉諺", "陳奕璇", "池宇顓", "游璦禎"],
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
  });

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [checkedStudents, setCheckedStudents] = useState([]);

  // 用來暫存表單輸入
  const [newTime, setNewTime] = useState("");
  const [newTeacher, setNewTeacher] = useState("");
  const [newStudent, setNewStudent] = useState("");

  // 切換日、時段或老師時重置勾選狀態
  const handleSelectionChange = (type, value) => {
    setCheckedStudents([]);
    if (type === "day") {
      setSelectedDay(value);
      // 預設選第一個時段
      const firstTime = Object.keys(scheduleData[value])[0] || "";
      setSelectedTime(firstTime);
      // 預設選第一位老師
      if (firstTime) {
        const firstTeacher = scheduleData[value][firstTime].teachers?.[0] || "";
        setSelectedTeacher(firstTeacher);
      } else {
        setSelectedTeacher(null);
      }
    } else if (type === "time") {
      setSelectedTime(value);
      const firstTeacher = scheduleData[selectedDay][value].teachers?.[0] || "";
      setSelectedTeacher(firstTeacher);
    } else if (type === "teacher") {
      setSelectedTeacher(value);
    }
  };

  // 勾選學生
  const handleCheckboxChange = (student) => {
    setCheckedStudents((prev) => {
      if (prev.includes(student)) {
        return prev.filter((s) => s !== student);
      } else {
        return [...prev, student];
      }
    });
  };

  // ---------------------
  //  新增/刪除 時段
  // ---------------------
  const handleAddTimeSlot = () => {
    if (!selectedDay || !newTime.trim()) return;

    // 若該時段已存在，就不重複新增
    if (scheduleData[selectedDay][newTime]) {
      alert("此時段已存在！");
      return;
    }

    // 使用深拷貝或淺拷貝都可以，這裡簡單做法：淺拷貝+修改
    setScheduleData((prev) => {
      const updated = { ...prev };
      updated[selectedDay] = { ...updated[selectedDay] };

      updated[selectedDay][newTime] = {
        teachers: [],
        students: {},
      };
      return updated;
    });

    setNewTime(""); // 清空輸入欄
  };

  const handleDeleteTimeSlot = (time) => {
    if (!selectedDay) return;
    // eslint-disable-next-line no-restricted-globals
    if (!confirm(`確定要刪除「${selectedDay}」的時段「${time}」嗎？`)) return;

    setScheduleData((prev) => {
      const updated = { ...prev };
      updated[selectedDay] = { ...updated[selectedDay] };
      delete updated[selectedDay][time];
      return updated;
    });

    // 若刪除的正好是目前選到的時段，就重置
    if (selectedTime === time) {
      setSelectedTime(null);
      setSelectedTeacher(null);
    }
  };

  // ---------------------
  //  新增/刪除 老師
  // ---------------------
  const handleAddTeacher = () => {
    if (!selectedDay || !selectedTime || !newTeacher.trim()) return;

    setScheduleData((prev) => {
      const updated = { ...prev };
      updated[selectedDay] = { ...updated[selectedDay] };
      const timeSlot = { ...updated[selectedDay][selectedTime] };

      // 若該老師已經存在就不重複加
      if (timeSlot.teachers.includes(newTeacher)) {
        alert("該老師已存在此時段！");
        return prev;
      }

      timeSlot.teachers = [...timeSlot.teachers, newTeacher];
      // 同時在 students 裡建立 key
      timeSlot.students = { ...timeSlot.students, [newTeacher]: [] };

      updated[selectedDay][selectedTime] = timeSlot;
      return updated;
    });

    setNewTeacher("");
  };

  const handleDeleteTeacher = (teacherName) => {
    if (!selectedDay || !selectedTime) return;
    // eslint-disable-next-line no-restricted-globals
    if (!confirm(`確定刪除老師「${teacherName}」嗎？`)) return;

    setScheduleData((prev) => {
      const updated = { ...prev };
      updated[selectedDay] = { ...updated[selectedDay] };
      const timeSlot = { ...updated[selectedDay][selectedTime] };

      // 刪除老師
      timeSlot.teachers = timeSlot.teachers.filter((t) => t !== teacherName);
      // 刪除該老師在 students 裡的 key
      const newStudentObj = { ...timeSlot.students };
      delete newStudentObj[teacherName];
      timeSlot.students = newStudentObj;

      updated[selectedDay][selectedTime] = timeSlot;
      return updated;
    });

    // 若刪除的是目前選到的老師，就重置
    if (selectedTeacher === teacherName) {
      setSelectedTeacher(null);
    }
  };

  // ---------------------
  //  新增/刪除 學生
  // ---------------------
  const handleAddStudent = () => {
    if (!selectedDay || !selectedTime || !selectedTeacher || !newStudent.trim())
      return;

    setScheduleData((prev) => {
      const updated = { ...prev };
      const slot = { ...updated[selectedDay][selectedTime] };
      const teacherStudents = [...slot.students[selectedTeacher]];

      // 若該學生已經存在就不重複加
      if (teacherStudents.includes(newStudent)) {
        alert("學生已存在！");
        return prev;
      }
      teacherStudents.push(newStudent);

      slot.students = {
        ...slot.students,
        [selectedTeacher]: teacherStudents,
      };

      updated[selectedDay][selectedTime] = slot;
      return updated;
    });

    setNewStudent("");
  };

  const handleDeleteStudent = (studentName) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm(`確定刪除學生「${studentName}」嗎？`)) return;
    if (!selectedDay || !selectedTime || !selectedTeacher) return;

    setScheduleData((prev) => {
      const updated = { ...prev };
      const slot = { ...updated[selectedDay][selectedTime] };
      const teacherStudents = [...slot.students[selectedTeacher]];

      const newList = teacherStudents.filter((s) => s !== studentName);
      slot.students[selectedTeacher] = newList;

      updated[selectedDay][selectedTime] = slot;
      return updated;
    });
  };

  return (
    <div className="schedule-app">
      {/* 右上角圖片 */}
      <img
        src="/S__432390146.gif" // 替換為你的圖片網址或相對路徑
        alt="S__432390146.gif"
        className="top-right-image"
      />

      <h1>長頸鹿美語  — 頭前 —</h1>

      {/* 搜索框 */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="搜尋老師或學生"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* 選擇禮拜幾 */}
      <div className="weekdays">
        <h2></h2>
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

      {/* 時段區塊 */}
      {selectedDay && (
        <div className="schedule-list">
          <h2>
            時段（{selectedDay}）
            {/* 新增時段表單 */}
            <div style={{ marginTop: "10px" }}>
              <input
                type="text"
                placeholder="新增時段，如 07:00-08:00"
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
                <button
                  style={{ marginLeft: 8 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTimeSlot(time);
                  }}
                >
                  刪除
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 老師區塊 */}
      {selectedDay && selectedTime && (
        <div className="teacher-list">
          <h2>
            老師（{selectedDay} {selectedTime}）
            {/* 新增老師表單 */}
            <div style={{ marginTop: "10px" }}>
              <input
                type="text"
                placeholder="新增老師名稱"
                value={newTeacher}
                onChange={(e) => setNewTeacher(e.target.value)}
              />
              <button onClick={handleAddTeacher}>新增老師</button>
            </div>
          </h2>

          <ul>
            {(scheduleData[selectedDay][selectedTime].teachers || [])
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
                  <button
                    style={{ marginLeft: 8 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTeacher(teacher);
                    }}
                  >
                    刪除
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* 學生區塊 */}
      {selectedDay && selectedTime && selectedTeacher && (
        <div className="student-list">
          <h2>
            學生名單（{selectedDay} {selectedTime} 老師：{selectedTeacher}）
            {/* 新增學生表單 */}
            <div style={{ marginTop: "10px" }}>
              <input
                type="text"
                placeholder="新增學生名稱"
                value={newStudent}
                onChange={(e) => setNewStudent(e.target.value)}
              />
              <button onClick={handleAddStudent}>新增學生</button>
            </div>
          </h2>
          <ul>
            {(scheduleData[selectedDay][selectedTime].students[selectedTeacher] ||
              [])
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
                  <button
                    style={{ marginLeft: 8 }}
                    onClick={() => handleDeleteStudent(student)}
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
