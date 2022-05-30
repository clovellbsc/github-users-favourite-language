import "../styling/findFavouriteLanguage.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "./form";

const FindFavouriteLanguage = () => {
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("");
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
      handleError(error);
    }
  };

  const handleRequest = async () => {
    const repositories = await axios.get(
      `https://api.github.com/users/${username}/repos?sort=updated&direction=desc`
    );
    const languagesArray = repositories.data.map((repo) => repo.language);
    setLanguage(mostFrequent(languagesArray));
  };

  const handleError = (error) => {
    console.log(error);
    setLanguageHeader(() => {
      if (error.request.status === 404) {
        return "This user does not exist";
      } else if (error.request.status === 400) {
        return "invalid username (github usernames can only contain alphanumeric characters and hyphens)";
      } else {
        return `Error: ${error.response.data.message}`;
      }
    });
  };

  const mostFrequent = (languagesArray) => {
    const countObject = languageCount(languagesArray);
    const countArray = Object.keys(countObject);
    if (countArray[0])
      return countArray.reduce((a, b) =>
        countObject[a] >= countObject[b] ? a : b
      );
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

  const languageOrLanguages = () => {
    if (language) {
      return `${username}'s favourite language`;
    } else if (username) {
      return `There is no data for ${username}'s languages`;
    }
  };

  useEffect(() => {
    setLanguageHeader(languageOrLanguages());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <div className="container">
      <h2>Search by github username to find their favourite language</h2>
      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        username={username}
      />
      <h4>{languageHeader}</h4>
      <p>{language}</p>
    </div>
  );
};

export default FindFavouriteLanguage;
