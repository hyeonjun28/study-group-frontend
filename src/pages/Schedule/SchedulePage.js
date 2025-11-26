import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Schedule.css'; // 스타일 파일 경로 확인

function SchedulePage() {
  const [joinedStudies, setJoinedStudies] = useState([]);
  const [selectedStudyId, setSelectedStudyId] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [note, setNote] = useState('');
  
  const navigate = useNavigate();
  
  // 1. 여기서 username을 가져옵니다. (이제 이걸 아래에서 사용합니다!)
  const username = localStorage.getItem('username'); 

  // 2. 백엔드에서 목록 가져오기
  useEffect(() => {
    console.log("📢 [1] 현재 로그인한 사용자:", username); // 로그 확인용

    if (!username) {
      alert("로그인이 필요합니다.");
      navigate('/login');
      return;
    }

    // 🔥 [핵심] username을 사용해서 백엔드에 요청을 보냅니다.
    console.log(`📢 [2] 서버로 요청 보냄: /rooms/my-schedule?username=${username}`);

    fetch(`/rooms/my-schedule?username=${username}`)
      .then(res => {
        if (!res.ok) throw new Error("네트워크 응답 실패");
        return res.json();
      })
      .then(data => {
        console.log("📢 [3] 서버에서 받은 데이터:", data); // 로그 확인용

        // 백엔드 데이터(name)를 프론트엔드 변수(title)로 변환
        const mappedData = data.map(room => ({
          ...room,
          title: room.name 
        }));

        setJoinedStudies(mappedData);

        // 목록이 있으면 첫 번째 방 자동 선택
        if (mappedData.length > 0) {
          setSelectedStudyId(mappedData[0].id);
        } else {
          setSelectedStudyId(null);
        }
      })
      .catch(err => console.error("❌ [오류] 데이터 불러오기 실패:", err));
  }, [username, navigate]); // username이 바뀔 때마다 실행

  // 3. 선택된 스터디의 개인 일정(localStorage) 불러오기
  useEffect(() => {
    if (selectedStudyId === null) {
      setSchedule([]);
      return;
    }
    const savedSchedules = JSON.parse(localStorage.getItem('schedule')) || [];
    const studySchedule = savedSchedules.find(s => s.studyId === selectedStudyId);
    setSchedule(studySchedule && Array.isArray(studySchedule.events) ? [...studySchedule.events] : []);
  }, [selectedStudyId]);

  // 4. 일정 추가 (localStorage)
  const handleAdd = () => {
    if (!note.trim() || selectedStudyId === null) return;
    const savedSchedules = JSON.parse(localStorage.getItem('schedule')) || [];
    const studyIndex = savedSchedules.findIndex(s => s.studyId === selectedStudyId);
    
    // 날짜 포맷팅
    const dateStr = selectedDate.toLocaleDateString('en-CA'); // YYYY-MM-DD 형식

    const newEvent = { date: dateStr, note };
    let updatedSchedules;

    if (studyIndex > -1) {
      const updatedEvents = [...(savedSchedules[studyIndex].events || []), newEvent];
      updatedSchedules = [...savedSchedules];
      updatedSchedules[studyIndex] = { studyId: selectedStudyId, events: updatedEvents };
    } else {
      updatedSchedules = [...savedSchedules, { studyId: selectedStudyId, events: [newEvent] }];
    }

    localStorage.setItem('schedule', JSON.stringify(updatedSchedules));
    const currentEvents = updatedSchedules.find(s => s.studyId === selectedStudyId).events;
    setSchedule(currentEvents);
    setNote('');
  };

  // 5. 일정 삭제
  const handleDelete = (index) => {
    if (selectedStudyId === null) return;
    const savedSchedules = JSON.parse(localStorage.getItem('schedule')) || [];
    const studyIndex = savedSchedules.findIndex(s => s.studyId === selectedStudyId);
    if (studyIndex === -1) return;

    const updatedEvents = savedSchedules[studyIndex].events.filter((_, i) => i !== index);
    const updatedSchedules = [...savedSchedules];
    updatedSchedules[studyIndex] = { studyId: selectedStudyId, events: updatedEvents };

    localStorage.setItem('schedule', JSON.stringify(updatedSchedules));
    setSchedule([...updatedEvents]);
  };

  return (
    <div className="schedule-container">
      <h1>📅 스터디 일정 관리</h1>

      {joinedStudies.length === 0 ? (
        <div style={{textAlign: 'center', marginTop: '30px', color: '#666'}}>
          <h3>참여중인 스터디가 없습니다.</h3>
          <p>서버에서 데이터를 찾지 못했습니다.</p>
          <button 
            className="schedule-add-button"
            onClick={() => navigate('/study')}
            style={{marginTop: '10px'}}
          >
            스터디 찾으러 가기
          </button>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ marginRight: '10px', fontWeight: 'bold' }}>참여중인 스터디: </label>
            <select
                className="schedule-select"
                value={selectedStudyId || ''}
                onChange={e => setSelectedStudyId(Number(e.target.value))}
              >
                {joinedStudies.map(s => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
          </div>

          <div className="schedule-input">
            <DatePicker
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
              className="date-picker-input"
            />
            <input
              type="text"
              placeholder="일정 메모 입력"
              value={note}
              onChange={e => setNote(e.target.value)}
            />
            <button onClick={handleAdd} className="schedule-add-button">추가</button>
          </div>

          <ul className="schedule-list">
            {schedule.length === 0 && <p style={{color: '#999', fontSize:'0.9em'}}>등록된 일정이 없습니다.</p>}
            {schedule.map((item, index) => (
              <li key={index} className="schedule-item">
                <span style={{fontWeight: 'bold', marginRight: '10px'}}>{item.date}</span> 
                <span>{item.note}</span>
                <button className="schedule-delete-button" onClick={() => handleDelete(index)}>삭제</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default SchedulePage;