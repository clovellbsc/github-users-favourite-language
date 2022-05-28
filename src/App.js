import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState("")
  const [languages, setLanguages] = useState([])
  const [languageHeader, setLanguageHeader] = useState(null)

  const handleChange = (event) => {
    const user = event.target.value
    setUsername(user)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const repositories = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`)
      const languagesArray = repositories.data.map((repo) => repo.language)
      setLanguages(mostFrequent(languagesArray))
    } catch(error) {
      console.log(error)
    }
  }

  const mostFrequent = (languagesArray) => {
    const countObject = languageCount(languagesArray)
    return Object.keys(countObject).filter(x => {
      return countObject[x] === Math.max(...Object.values(countObject))
    })
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

  const mostFrequentLanguageArray = languages.map((language, index) => {
    return <li key={index}>{language}</li>
  })

  const languageOrLanguages = () => {
    if (username && languages.length < 1) {
      return `There is no data for ${username}'s languages`
    }
  }

  useEffect(() => {
    setLanguageHeader((languageOrLanguages()))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languages])

  return (
    <div>
      <h2>Search by github username to find their favourite language</h2>
      <form>
        <input type="text" onChange={handleChange} value={username} placeholder="Username" />
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
      <h4>{languageHeader}</h4>
      {languages[0] &&
        <ul>
          {mostFrequentLanguageArray}  
        </ul>
      }
    </div>
  );
}

export default App;
