import "./App.css";

import React, { useState } from "react";

import { NewsForm } from "./Components/NewsForm/NewsForm";

function App() {
  const [newsUrl, setNewsUrl] = useState<string>("");
  const [sourceHtml, setSourceHtml] = useState<string[]>([""]);
  const [title, setTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleClear = () => {
    setNewsUrl("");
    setSourceHtml([""]);
    setTitle("");
    setError(null);
  };

  return (
    <div className="App">
      <h1>Simple News</h1>
      <p>
        Paste a link to a news site, and hit Get Outline button to see the raw
        contents of the news article. Please allow for a few seconds in order to
        process your request.
      </p>
      <NewsForm
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        newsUrl={newsUrl}
        setNewsUrl={setNewsUrl}
        setTitle={setTitle}
        setSourceHtml={setSourceHtml}
        error={error}
        setError={setError}
      />

      <button onClick={handleClear}>Clear</button>

      <article>
        <h2>{title}</h2>
        {sourceHtml.map((item, idx) => (
          <p key={idx}>{item}</p>
        ))}

        {isLoading ? <span className="loader"></span> : null}
      </article>
    </div>
  );
}

export default App;
