import React, { useState } from "react";
import styles from "./ReadMore.module.scss";

function ReadMore({ children, settings }) {
  const defaultSettings = {
    readMoreText: "Read more",
    readLessText: "Read less",
    readMoreColor: "#007bff",
    charLimit: 450,
  };

  const appSettings = Object.assign(defaultSettings, settings);
  const [charLimit, setCharLimit] = useState(appSettings.charLimit);

  const getReadMoreContent = () => {
    const { readMoreText, readLessText, className } = appSettings;

    if (children.length > charLimit) {
      return (
        <div className={`short-text ${className}`}>
          {children.substr(0, charLimit)}...
          <div className={styles.gradientBackground}></div>
          <div
            className="readMoreText"
            style={{ color: "#007bff", cursor: "pointer" }}
            role="presentation"
            dangerouslySetInnerHTML={{ __html: readMoreText }}
            onClick={() => showLongText()}
          ></div>
        </div>
      );
    } else if (children.length < charLimit) {
      return (
        <div
          className={`short-text ${className}`}
          dangerouslySetInnerHTML={{ __html: children }}
        ></div>
      );
    }
    return (
      <div className={`short-text ${className}`}>
        {children}
        <div
          className="readMoreText"
          style={{ color: "#007bff", cursor: "pointer" }}
          role="presentation"
          dangerouslySetInnerHTML={{ __html: readLessText }}
          onClick={() => showShortText()}
        ></div>
      </div>
    );
  };

  const showLongText = () => {
    setCharLimit(children.length);
    getReadMoreContent();
  };

  const showShortText = () => {
    setCharLimit(appSettings.charLimit);
    getReadMoreContent();
  };

  return <div className={styles.readMoreContent}>{getReadMoreContent()}</div>;
}

export default ReadMore;
