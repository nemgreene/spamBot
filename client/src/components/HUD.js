import React, { useEffect, useState } from "react";

function HUD({ messages, client }) {
  const [messageList, cMessages] = useState(messages);
  const [active, cActive] = useState({});
  const [expMsg, cExpMsg] = useState({ sender: [0], subject: [0] });

  //   const loadNext = () => {
  //     cMessages((prev) => {
  //       var ary = [...prev];
  //       let first = ary.shift();
  //       ary.push(first);
  //       cActive(ary[0]);
  //       return ary;
  //     });
  //   };

  const handleClick = async (e, bool) => {
    if (messages) {
      const { sender, subject } = await client.updateDictionary(active, bool);
      console.log(sender, subject);
      cExpMsg({ sender, subject });
    }
    // loadNext();
  };

  useEffect(() => {
    cMessages(messages);
    cActive(messages[0]);
  }, [messages]);

  return (
    <div className="hudContainer" style={{ height: "300px", width: "300px" }}>
      <div
        className="diplayContainer"
        style={{ height: "200px", width: "300px" }}
      >
        <div className="date">{active?.date}</div>
        <div className="subject">{active?.subject}</div>
        <div className="from">{active?.from}</div>
      </div>
      <button onClick={(e) => handleClick(e, false)}>Spam</button>
      <button onClick={(e) => handleClick(e, true)}>Mail</button>
      <div
        className="diplayContainer"
        style={{ height: "200px", width: "300px" }}
      >
        <div className="sender">
          Sender
          <ul>
            {expMsg.sender.map((i, v) => {
              return <li key={i}> {i}</li>;
            })}
          </ul>
        </div>
        <div className="subject">
          Header
          <ul>
            {expMsg.subject.map((i, v) => {
              return <li key={i}> {i}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HUD;
