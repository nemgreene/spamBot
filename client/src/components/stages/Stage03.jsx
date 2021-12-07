import React, { useEffect, useState } from "react";

function Stage03({ nexus, spam, mail, totals, pP, fc }) {
  return (
    <div className="stage03Container">
      <div>
        First, well initialize our guess. The guess can be random, but to give a
        good baseline, well just take a look at how many spam emails we have
        versus mail
      </div>
      <div>Total spam emails: {totals.spam}</div>
      <div>Total mail emails: {totals.mail}</div>
      <div>Meaning that the likeliness this email will be spam is:</div>
      <div>{totals.spam}</div>
      <div>/</div>
      <div>{totals.spam + "+" + totals.mail}</div>
      <div>=</div>
      <div>{!isNaN(pP.spam) ? pP.spam : ""}</div>
      <div>Meaning that the likeliness this email will be mail is:</div>
      <div>{totals.mail}</div>
      <div>/</div>
      <div>{totals.spam + "+" + totals.mail}</div>
      <div>=</div>
      <div>{fc(pP.mail)}</div>

      <div className="mailContainer">
        <div>As well as do the same for our other side</div>
        <div>Lets see that again</div>
        <div>{Object.keys(mail[0])}</div>
        <div>
          Take a look at the total number of times this word has appeared in the
          mail category
        </div>
        <div>{Object.values(mail[0])}</div>
        <div>divided by the total number of words logged as mail</div>
        <div>{totals.mail}</div>
        <div>Equals</div>
        <div>
          test
          {fc(parseInt(Object.values(mail[0])) / parseInt(totals.mail))}
        </div>
        <div>
          {mail.map((v, i) => {
            return (
              <div key={i}>
                {Object.keys(v) + " "}
                {fc(parseInt(Object.values(v)) / parseInt(totals.spam))}
              </div>
            );
          })}
        </div>
      </div>
      <div className="spamContainer">
        Lets take a look at some statistics! The core of this machine learning
        algorithm requires a comparison between which category this word is most
        likely to appear
        <div>Lets start with that first word</div>
        <div>{Object.keys(spam[0])}</div>
        <div>
          Take a look at the total number of times this word has appeared in the
          spam category
        </div>
        <div>{Object.values(spam[0])}</div>
        <div>divided by the total number of words logged as spam</div>
        <div>{totals.spam}</div>
        <div>Equals</div>
        <div>
          {fc(parseInt(Object.values(spam[0])) / parseInt(totals.spam))}
        </div>
        <div>Well store this value with the word for later</div>
        <div>then also do the same for all the other words in our list</div>
        <div>
          {spam.map((v, i) => {
            return (
              <div key={i}>
                {Object.keys(v) + " "}
                {fc(parseInt(Object.values(v)) / parseInt(totals.spam))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Stage03;
