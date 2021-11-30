const mongoose = require("mongoose");
const EntrySchema = require("./schema/dict");

const pullNumber = (str, target) => {
  let extract = new RegExp(
    '"word":"' + target + '","number":([0-9]+),"head":([a-z]+),"spam":([a-z]+)'
  );
  const pulled = str.match(extract);
  // if (target === "deliveroo") {
  //   console.log(str);
  // }
  if (pulled === null) {
    return null;
  } else {
    return pulled;
  }
};

const insertOne = async (letter, word) => {
  let insert = new EntrySchema({
    key: letter,
    entries: [{ word, number: 0, head: true, spam: true }],
  });
  await insert.save();
};

const updateOne = async (letter, word, obj) => {
  let updated = await EntrySchema.findOneAndUpdate(
    { key: letter },
    { entries: [...obj.entries, { word, number: 0, head: true, spam: true }] }
  );
  await updated.save();
};

const upsertOne = async (letter, word, obj, prevNum) => {
  let rep = new RegExp('"word":"' + word + '","number":([0-9]+)');
  let stringIfy = JSON.stringify(obj.entries);
  let match = stringIfy.replace(
    rep,
    `"word":"${word}","number":${parseInt(prevNum) + 1}`
  );
  let updated = await EntrySchema.findOneAndUpdate(
    { key: letter },
    { entries: JSON.parse(match) }
  );
  await updated.save();
};

const updateDispatch = async (obj, index, i) => {
  if (obj) {
    const flatten = JSON.stringify(obj);
    const pulledData = pullNumber(flatten, i);
    // pulled data returns null if no match; if word not in db
    if (pulledData === null) {
      console.log(`word not in db at letter ${index} at word ${i}`);
      updateOne(index, i, obj);
    } else {
      console.log(`incrementing letter ${index} at word ${i}`);
      const [_, prevNum, head, spam] = pulledData;
      upsertOne(index, i, obj, prevNum);
    }
    // else update word
  } else {
    console.log(`creating new letter ${index} at word ${i}`);
    insertOne(index, i);
  }
};

const flattenDispatch = (arr) => {
  // in [a, b, c, d, d, 2, 3, 5]
  // out [[a], [b], [c], [d, d], [2, 3, 5]]
  let ret = {};
  let alph = "abcdefghijklmnopqrstuvwxyz".split("");
  arr.map((v, i, a) => {
    v = v.toLowerCase();
    if (v[0] in ret) {
      ret[v[0]] = [...ret[v[0]], v];
    } else if (!alph.includes(v[0])) {
      ret.null = [v];
    } else {
      ret[v[0]] = [v];
    }
  });
  return Object.entries(ret)
    .flat()
    .filter((v) => {
      return Array.isArray(v);
    });
};

exports.dispatchWords = (input) => {
  let alph = "abcdefghijklmnopqrstuvwxyz".split("");
  sortedInput = input.sort((a, b) => a.localeCompare(b));
  let flattened = flattenDispatch(sortedInput);
  console.log(flattened);

  // input.map(async (i) => {
  //   let index = alph.includes(i.slice(0, 1)) ? i.slice(0, 1) : "misc";
  //   let docu = await EntrySchema.findOne({ key: index });
  //   await updateDispatch(docu, index, i);
  // });
};
