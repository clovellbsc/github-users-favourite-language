import "../styling/findFavouriteLanguage.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const FindFavouriteLanguage = () => {
  const [username, setUsername] = useState("");
  const [languages, setLanguages] = useState([]);
  const [languageHeader, setLanguageHeader] = useState(null);

  const handleChange = (event) => {
    const user = event.target.value;
    setUsername(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleRequest();
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };

  const handleRequest = async () => {
    const repositories = await axios.get(
      `https://api.github.com/users/${username}/repos?sort=updated&direction=desc`
    );
    const languagesArray = repositories.data.map((repo) => repo.language);
    setLanguages(mostFrequent(languagesArray));
  };

  const handleError = (error) => {
    setLanguageHeader(() => {
      if (error.request.status === 404) {
        return "This user does not exist";
      } else if (error.request.status === 400) {
        return "invalid username (github usernames can only contain alphanumeric characters and hyphens)";
      } else {
        return `Error: ${error.message}`;
      }
    });
  };

  const mostFrequent = (languagesArray) => {
    const countObject = languageCount(languagesArray);
    return Object.keys(countObject).filter((x) => {
      return countObject[x] === Math.max(...Object.values(countObject));
    });
  };

  const languageCount = (languagesArray) => {
    const count = {};
    const languagesArrayWithoutNull = languagesArray.filter((element) => {
      return element !== null;
    });
    languagesArrayWithoutNull.forEach((language) => {
      count[language] ? count[language]++ : (count[language] = 1);
    });
    return count;
  };

  const mostFrequentLanguageArray = languages.map((language, index) => {
    return <li key={index}>{language}</li>;
  });

  const languageOrLanguages = () => {
    if (languages.length === 1) {
      return `${username}'s favourite language`;
    } else if (languages.length > 1) {
      return `${username}'s favourite languages`;
    } else if (username && languages.length < 1) {
      return `There is no data for ${username}'s languages`;
    }
  };

  useEffect(() => {
    setLanguageHeader(languageOrLanguages());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languages]);

  return (
    <div className="container">
      <h2>Search by github username to find their favourite language</h2>
      <form>
        <input
          type="text"
          onChange={handleChange}
          value={username}
          placeholder="Username"
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      <h4>{languageHeader}</h4>
      {languages[0] && <ul>{mostFrequentLanguageArray}</ul>}
    </div>
  );
};

export default FindFavouriteLanguage;
