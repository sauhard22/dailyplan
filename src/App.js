import { useState } from 'react'
import './style.css';
import axios from 'axios'

function App() {

  /* Date State */
  const [fromDate, setFromDate] = useState('XX/XX/XX')
  const [toDate, setToDate] = useState('XX/XX/XX')
  const [to, setTo] = useState('')
  const [from, setFrom] = useState('')

  /* Class State */

  const [cls, setCls] = useState('')
  const [clas, setClas] = useState('')

  /* Present Date State */
  const [pDate, setPDate] = useState('')
  const [presentDate, setPresentDate] = useState('')

  /* Day state */

  const [day, setDay] = useState('')
  const [dayHeader, setDayHeader] = useState('')

  /* subject state */

  const [sub, setSub] = useState('')
  const [teacher, setTeacher] = useState('')
  const [phone, setPhone] = useState('')
  const [topic, setTopic] = useState('')
  const [pd, setPd] = useState('')
  const [chapter, setChapter] = useState('')

  /* Form State */

  const [form, setForm] = useState([])
  const [id_1, setId_1] = useState('')

  /* functions */

  const changeToValue = (e) => {
    setTo(e.target.value)
  }
  const changeFromValue = (e) => {
    setFrom(e.target.value)
  }
  const changeClassValue = (e) => {
    setCls(e.target.value)
  }
  const changePresentDateValue = (e) => {
    setPDate(e.target.value)
  }

  const changeDayValue = (e) => {
    setDay(e.target.value)
  }

  const handleClick = () => {

    axios.post("http://localhost:3001/form_details/insert", {
      from_date: from,
      to_date: to,
      clas_s: cls,
      date: pDate,
      day: day
    })

    setFromDate(to)
    setToDate(from)
    setClas(cls)
    setPresentDate(pDate)
    setDayHeader(day)
  }

  const submit = () => {

    axios.post("http://localhost:3001/period_details/insert", {
      date: pDate,
      period_number: pd,
      subject: sub,
      teacher: teacher,
      phone: phone,
      topic: topic
    })
    setForm([...form, {
      id: Math.floor(Math.floor(Math.random() * 10000)),
      period: pd,
      subject: sub,
      teacher: teacher,
      phone: phone,
      topic: topic
      
    }])
  }

  const generatePDF = () => {
    setId_1(Math.floor(Math.floor(Math.random() * 10000)))
    axios.post("http://localhost:3001/generate/pdf", {
      id_1: id_1,
      date: pDate,
      period_number: pd,
      subject: sub,
      teacher: teacher,
      phone: phone,
      topic: topic,
      from_date: from,
      to_date: to,
      clas_s: cls,
      chapter: chapter,
      day: day,
      form: form

    })
  }
  return (

    /* input form */
    <div className="form">
      <h1>Daily Plan</h1>
      <div>
          <label >From</label>
          <input type="text" placeholder="FROM DATE" onChange={changeFromValue} />       
          <label>To</label>
          <input placeholder="TO DATE" type="text" onChange={changeToValue} />       
          <label>Class</label>
          <input placeholder="Class" type="text" onChange={changeClassValue} />        
          <label>Day</label>
          <input placeholder="Day" type="text" onChange={changeDayValue} />  
          <label>Present Date</label>
          <input placeholder="Date" type="text" onChange={changePresentDateValue} />
        <button variant="contained" onClick={handleClick}>SUBMIT</button>
      </div>
      <br />

      {/* Period Details */}

      <div>
        <label>Period Details</label>
        <input placeholder="Period Number" onChange={e => setPd(e.target.value)} type="text" />
        <input placeholder="Subject" onChange={e => setSub(e.target.value)} type="text" />
        <input placeholder="Teacher Name" onChange={e => setTeacher(e.target.value)} type="text" />
        <input placeholder="Phone Number" onChange={e => setPhone(e.target.value)} type="text" />
        <input placeholder="Chapter" type="text" onChange={e => setChapter(e.target.value)} />
        <input placeholder="Topic" type="text" onChange={e => setTopic(e.target.value)} />
        <button variant="contained" onClick={submit}>SUBMIT</button>
      </div>
      <br />

      {/* Main */}

      <div className="body">
        <div className="header">
          <h1>Weekly Online Learning Schedule</h1>
          <h3 className="in-hd"> Date - {fromDate} to {toDate} </h3>
          <h3 className="in-hd">Class - {clas}</h3>
          <h3 className="in-hd">{dayHeader} - {presentDate}</h3>
        </div>
        <div>
          {
            form.map(form => (
              <div>
                <h3>Period {form.period} {form.subject} [{form.teacher}] Ph no. {form.phone}</h3>
                <h3>Zoom Interactive class(Chap 1- Topic {form.topic})</h3>
              </div>
            ))
          }
        </div>
        <div className="footer">
          <h2>5:00PM – 6:00 PM  - SELF STUDY/REVISION TIME</h2>
        </div>
        <div className="content">
          <h3>Sub 1</h3>
          <h3>Sub 2</h3>
          <h3>Sub 3</h3>
          <h3>Sub 4</h3>
          <h3>Sub 5</h3>
        </div>
        <div>
          <h2>Note: In each period Teacher will be available on
            phone after Zoom interactive class/tutorial video,
            till the period ends. Feel free to interact through
            text/voice messaging or calling the teacher. </h2>
        </div>
      </div>
      <button onClick={generatePDF}>Generate</button>
    </div>
  );
}

export default App;
