import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState("")
  const [language, setLanguage] = useState([])

  const handleChange = (event) => {
    const user = event.target.value
    setUsername(user)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const repositories = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`)
      const languagesArray = repositories.data.map((repo) => repo.language)
      setLanguage(mostFrequent(languagesArray))
    } catch(error) {
      console.log(error)
    }
  }

  const mostFrequent = (languagesArray) => {
    const countObject = languageCount(languagesArray)
    return Object.keys(countObject).reduce((a, b) => countObject[a] > countObject[b] ? a : b)
  }

  const languageCount = (languagesArray) => {
    const count = {}
    const results = languagesArray.filter(element => {
      return element !== null;
    })
    results.forEach((language) => {
      count[language] ? count[language] ++ :count[language] = 1
    })
    return count
  }

  return (
    <div>
      <h2>Search by github username to find their favourite language</h2>
      <form>
        <input type="text" onChange={handleChange} value={username} placeholder="Username" />
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
      <h4>{language}</h4>
    </div>
  );
}

export default App;
