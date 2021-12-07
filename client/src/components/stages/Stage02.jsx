import React, { useState, useEffect } from "react";
const randomizer = () => {
  return Math.floor(Math.random() * 1000);
};
function Stage02({ nexus, spam, mail }) {
  console.log(spam, mail);
  return (
    <div className="stage02Container" style={{ backgroundColor: "lightPink" }}>
      <h3>
        Now that we've gotten our words, we'll need to access our database, and
        see how many times these words have appeared in both spam and regular
        emails{" "}
      </h3>
      <h2>Lets see those words again</h2>
      <h4>
        {`Sender name : ${nexus.sender}`} <br />
        {nexus.subject.map((v, i) => {
          return (
            <span className="nexusWordListContainer" key={i}>
              {v + " "}
            </span>
          );
        })}
      </h4>
      <div>
        Lets run some database magic. We'll need to tally up the total number of
        appearances{" "}
        <div className="spamContainer">
          For all the words appearing in spam emails
          {spam.map((v, i) => {
            return (
              <div className="spamListContainer" key={i}>{`${Object.keys(
                v
              )}: ${randomizer()}`}</div>
            );
          })}
          As well as how many times our sender has sent us spam:
          <div className="spamListContainer">{`${
            nexus.sender
          }: ${randomizer()}`}</div>
        </div>
        <div className="mailContainer">
          For all the words appearing in spam emails
          {mail.map((v, i) => {
            return (
              <div className="spamListContainer" key={i}>{`${Object.keys(
                v
              )} : ${randomizer()}`}</div>
            );
          })}
          As well as how many times our sender has sent us spam:
          <div className="spamListContainer">{`${
            nexus.sender
          }: ${randomizer()}`}</div>
        </div>
      </div>
    </div>
  );
}

export default Stage02;
