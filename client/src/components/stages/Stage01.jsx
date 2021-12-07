import React, { useState, useEffect } from "react";

function Stage01({ current, nexus }) {
  // useEffect(() => {
  //   cDemoEmail(messages[0]);
  //   console.log(client.nexusInterface(messages[0]));
  //   cDemoNexus(client.nexusInterface(messages[0]));
  // }, []);
  return (
    <div className="stage01Container" style={{ backgroundColor: "lightblue" }}>
      <h1>Lets take a look at thingy algorithm</h1>
      <h5>
        We'll be looking at an implementation of a spam bot, commonly found
        filtering your inbox
      </h5>
      <p>Lets look at a test email, coming live from my inbox</p>
      <p>Heres the raw data chunk:</p>
      <div className="demoEmailContainer">
        date:
        {current.date} <br />
        subject:
        {current.subject} <br />
        from:
        {current.from} <br />
        snippet:
        {current.snippet} <br />
      </div>
      <p>Lets pull out the data we want from that</p>
      <p>We'll keep it simple, just the name of the sender, and the header</p>
      <div className="demoEmailContainer">
        {`Sender name : ${nexus.sender}`} <br />
        {`Words : ${nexus.subject}`} <br />
      </div>
    </div>
  );
}

export default Stage01;
