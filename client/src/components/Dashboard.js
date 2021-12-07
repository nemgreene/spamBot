// import React, { useEffect } from "react";
import React, { useEffect, useState } from "react";
import HUD from "./HUD";
import Stage01 from "./stages/Stage01";
import Stage02 from "./stages/Stage02";
import Stage03 from "./stages/Stage03.jsx";
import Stage04 from "./stages/Stage04";
import Stage05 from "./stages/Stage05";
// import Mail from "./Mail";
// import Spam from "./Spam";

// let dict = {};
const testIndex = 1;
function Dashboard({ messages, client }) {
  const [current, cCurrent] = useState(messages[testIndex]);
  const [demoNum, cDemoNum] = useState({ sender: "", spam: [{}], mail: [{}] });
  const [nexus, cNexus] = useState(
    messages ? client.nexusInterface(messages[2]) : {}
  );
  const [totals, cTotals] = useState({ spam: 0, mail: 0 });
  const [totalArr, cTotalArr] = useState({ spam: [], mail: [] });
  const [pP, cPP] = useState({ spam: 0, mail: 0 });

  const findTotal = (arr) => {
    let total = arr.reduce((p, c) => {
      return { num: parseInt(Object.values(p)) + parseInt(Object.values(c)) };
    });
    return total.num;
  };
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

  const fc = (number) => {
    if (isNaN(number)) {
      return "";
    } else {
      return Number(number.toFixed(4));
    }
  };

  useEffect(() => {
    console.log(messages[0]);
    const randomizer = () => {
      return Math.floor(Math.random() * 1000);
    };

    if (messages) {
      const nex = client.nexusInterface(messages[testIndex]);
      let mail = [];
      let spam = nex.subject.map((v) => {
        mail.push({ [v]: randomizer() });
        return { [v]: randomizer() };
      });
      let [spamTotal, mailTotal] = [findTotal(spam), findTotal(mail)];

      let { spamTotals, mailTotals } = {
        spamTotals: spam.map((v, i) => {
          return parseInt(Object.values(v)) / spamTotal;
        }),
        mailTotals: mail.map((v, i) => {
          return parseInt(Object.values(v)) / mailTotal;
        }),
      };
      cTotalArr({ spam: spamTotals, mail: mailTotals });
      cNexus(nex);
      cDemoNum({ sender: nex.sender, spam, mail });
      cTotals({
        spam: spamTotal,
        mail: mailTotal,
        spamSum: spamTotals.reduce((a, c) => a * c),
        mailSum: mailTotals.reduce((a, c) => a * c),
      });
      cPP({
        spam: spamTotal / (spamTotal + mailTotal),
        mail: mailTotal / (spamTotal + mailTotal),
      });
    }
  }, [messages]);

  return (
    <div className="dashContainer">
      {/* {current?.date} */}
      {/* <HUD messages={messages} client={client} /> */}
      {/* <Mail /> */}
      {/* <Spam /> */}
      {/* <Stage01 current={current} nexus={nexus} /> */}
      {/* <Stage02 nexus={nexus} spam={demoNum.spam} mail={demoNum.mail} /> */}
      {/* <Stage03
        nexus={nexus}
        spam={demoNum.spam}
        mail={demoNum.mail}
        totals={totals}
        pP={pP}
        fc={(n) => fc(n)}
      /> */}
      {/* <Stage04
        nexus={nexus}
        spam={demoNum.spam}
        mail={demoNum.mail}
        totals={totals}
        pP={pP}
        fc={(n) => fc(n)}
        totalArr={totalArr}
      />
    */}
      <Stage05 />
    </div>
  );
}

export default Dashboard;
