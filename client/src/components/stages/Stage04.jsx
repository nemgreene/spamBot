import React from "react";

function Stage04({ nexus, spam, mail, totals, pP, fc, totalArr }) {
  return (
    <div className="stageo4Container">
      <div>
        We've finished the bulk of the math for our algorithm; lets crunch some
        numbers, and start the classification
      </div>
      <div>We'll see the inital guess that any given email is spam</div>
      <div>LikelyHood that this email is spam {fc(pP.spam)}</div>
      <div>LikelyHood that this email is mail {fc(pP.mail)}</div>
      <div>We'll classify these as parent probablility, or PP</div>
      <div>
        Next, we'll look at the multiplication of all the words probablity with
        the pP
      </div>
      <div className="spamContainer">
        <div>pP (email)|(spam) {fc(pP.spam)}</div>
        x <br />
        {spam.map((v, i) => {
          return (
            <div key={i}>{`pP (${Object.keys(v)})|spam = ${fc(
              Object.values(v) / totals.spam
            )} x `}</div>
          );
        })}
        <br />
        <span>{fc(pP.spam)}</span>
        {spam.map((v, i) => {
          return (
            <span key={i}>{` x ${fc(Object.values(v) / totals.spam)} `}</span>
          );
        })}
        =<span>{Number(totals.spamSum).toFixed(20)}</span>
        <div>We'll store this as the score this mail has gotten as a spam</div>
      </div>
      <div className="mailContainer">
        <div>pP (email)|(mail) {fc(pP.mail)}</div>
        x <br />
        {mail.map((v, i) => {
          return (
            <div key={i}>{`pP (${Object.keys(v)})|mail = ${fc(
              Object.values(v) / totals.mail
            )} x `}</div>
          );
        })}
        <br />
        <span>{fc(pP.mail)}</span>
        {mail.map((v, i) => {
          return (
            <span key={i}>{` x ${fc(Object.values(v) / totals.mail)} `}</span>
          );
        })}
        =<span>{Number(totals.mailSum).toFixed(20)}</span>
        <div>We'll store this as the score this mail has gotten as a mail</div>
      </div>
      <div>
        <div>
          Finally, a compariseon between the two scores will finalize the
          classification
        </div>
        Total score for spam
        <br />
        {Number(totals.spamSum).toFixed(20)}
      </div>
      <div>
        Total score for mail <br />
        {Number(totals.mailSum).toFixed(20)}
      </div>
      <div>Classifying this email as :</div>
      <h2>
        {Number(totals.spamSum).toFixed(20) > Number(totals.mailSum).toFixed(20)
          ? "Spam"
          : "Mail"}
      </h2>
    </div>
  );
}

export default Stage04;
