import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

const NoteApp = () => {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  // тут происходит добавление нового города
  const addNote = e => {
    e.preventDefault()
    setNotes([
      ...notes,
      { title, body }
    ])
    setTitle('')
    setBody('')
  }

  const removeNote = title => setNotes(notes.filter(note => note.title !== title))

  // получить все данные из localStorage и сделать по ним запросы
  useEffect(() => {
    // async function getWeather() {
    //   let response = await fetch('http://api.apixu.com/v1/current.json?key=3403e434b70842f5902100116190307&q=Moscow')
    //   let data = await response.json()
    //   let town = data.location.name
    //   let pic = data.current.condition.icon
    //   let goodPic = pic.substr(2, pic.length -2)
    //   let currentWeatherC = data.current.temp_c

    //   console.log(town)
    //   console.log(goodPic)
    //   console.log(currentWeatherC)
    //   console.log(data)
    // }
    // getWeather()

    const notesData = JSON.parse(localStorage.getItem('notes'))

    if (notesData) {
      setNotes(notesData)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])
    
  return (
    <div>
      <h1>Notes</h1>
      {notes.map(note => (
        <div key={note.title}>
          <h3>{note.title}</h3>
          <p>{note.body}</p>
          <button onClick={() => removeNote(note.title)}>x</button>
        </div>
      ))}
      <p>Add note</p>
      <form onSubmit={addNote}>
        <input value={title} onChange={e => setTitle(e.target.value)} />
        <br />
        <textarea value={body} onChange={e => setBody(e.target.value)} ></textarea>
        <button>add note</button>
      </form>
    </div>
  )
}

ReactDOM.render(<NoteApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
