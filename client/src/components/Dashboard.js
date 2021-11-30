// import React, { useEffect } from "react";
import React from "react";
import HUD from "./HUD";
// import Mail from "./Mail";
// import Spam from "./Spam";

// let dict = {};
function Dashboard({ messages, client }) {
  //#region

  // extract snippets
  // const parse = (arr) => {
  //   const snippetsArr = arr.map((v, i) => {
  //     return v.result.snippet;
  //   });
  //   return snippetsArr;
  // };

  //   iterate over snippet, and count all the words
  // note: intermediary function is needed to seperate spam from not spam
  // const snippetWordCounter = (snippet) => {
  //   if (!snippet.trim()) {
  //     return;
  //   }
  //   snippet.split(" ").map((v) => {
  //     //   console.log(v);
  //     if (dict[v] === undefined) {
  //       dict[v] = 1;
  //     } else {
  //       dict[v] = dict[v] + 1;
  //     }
  //   });
  // };

  //   iterate over list of snippets and update dict obj
  // const snippetCounter = (snippetArray) => {
  //   snippetArray.map((v) => {
  //     snippetWordCounter(v);
  //   });

  // console.log(dict);
  // };
  // snippetCounter(parse(messages));
  // #endregion

  // useEffect(() => {
  //   if (messages) {
  //     client.updateDictionary(messages);
  //   }
  // }, [messages]);

  return (
    <div className="dashContainer">
      <HUD messages={messages} client={client} />
      {/* <Mail /> */}
      {/* <Spam /> */}
    </div>
  );
}

export default Dashboard;
