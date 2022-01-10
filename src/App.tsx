import "./App.css";

import React, { useState } from "react";

import axios from "axios";

function App() {
  const [newsUrl, setNewsUrl] = useState<string>("");
  const [sourceHtml, setSourceHtml] = useState<string[]>([""]);
  const [title, setTitle] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await axios.post("http://localhost:3001/news", {
      newsUrl,
    });
    if (data) {
      setSourceHtml(data.paragraphs);
      setTitle(data.title);
    }
  };
  return (
    <div className="App">
      <h1>Simple News</h1>
      <p>
        Paste a link to a news site, and hit Get Outline button to see the raw
        contents of the news article. Please allow for a few seconds in order to
        process your request.
      </p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" onChange={(e) => setNewsUrl(e.target.value)} />
        <button>Get Outline</button>
      </form>

      <article>
        <h2>{title}</h2>
        {sourceHtml.map((item) => (
          <p>{item}</p>
        ))}
      </article>
    </div>
  );
}

export default App;
