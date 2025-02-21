import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [joke, setJoke] = useState(null);

  const fetchJoke = async () => {
    try {
      const response = await fetch("https://official-joke-api.appspot.com/random_joke");
      const data = await response.json();
      setJoke(data);
    } catch (error) {
      console.error("Error fetching joke:", error);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="container">
      <h1>Random Joke Generator</h1>
      {joke ? (
        <div className="joke-card">
          <p><strong>{joke.setup}</strong></p>
          <p>{joke.punchline}</p>
        </div>
      ) : (
        <p>Loading joke...</p>
      )}
      <button onClick={fetchJoke}>Get Another Joke</button>
    </div>
  );
}

export default App;
