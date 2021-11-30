const mongoose = require("mongoose");
const EntrySchema = require("./schema/dict");

const pullNumber = (str, target) => {
  let pulled = target.map((v) => {
    let extract = new RegExp(
      '"word":"' + v + '","number":([0-9]+),"head":([a-z]+),"spam":([a-z]+)'
    );
    const pulled = str.match(extract);
    if (!pulled) {
      return null;
    }
    return { word: v, number: pulled[1], head: pulled[2], spam: pulled[3] };
  });

  return pulled;
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
const updateMany = async (letter, word, obj, pulledData) => {
  let stringIfy = JSON.stringify(obj.entries);
  let ret = [];
  let append = pulledData.forEach((v, i) => {
    console.log(
      `one of words not in db at letter ${letter} at word ${word[i]}`
    );
    if (!v) {
      let _id = new mongoose.Types.ObjectId();
      ret.push({
        word: word[i],
        number: 0,
        head: true,
        spam: true,
        _id,
      });
    } else {
      console.log(`incrementing word  at letter ${letter} at word ${word[i]}`);
      let rep = new RegExp(`"word":"${word[i]}","number":([0-9]+)`);
      let match = stringIfy.replace(
        rep,
        `"word":"${word[i]}","number":${parseInt(v.number) + 1}`
      );
      ret.push(JSON.parse(match)[0]);
    }
  });
  let updated = await EntrySchema.findOneAndUpdate(
    { key: letter },
    { entries: ret }
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

const updateDispatch = async (letter, word, object) => {
  if (object) {
    let long = letter.length > 1;
    const flatten = JSON.stringify(object);
    const pulledData = pullNumber(flatten, word, long);

    if (pulledData.includes(null)) {
      updateMany(letter, word, object, pulledData);
    } else {
      console.log(pulledData);
    }

    return;
    // pulled data returns null if no match; if word not in db
    if (pulledData === null) {
      console.log(`word not in db at letter ${letter} at word ${word}`);
      updateOne(letter, word, object);
    } else {
      console.log(`incrementing letter ${letter} at word ${wprd}`);
      const [_, prevNum, head, spam] = pulledData;
      upsertOne(letter, word, object, prevNum);
    }
    // else update word
    // } else {
    //   console.log(`creating new letter ${letter} at word ${word}`);
    //   insertOne(letter, word);
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
  return ret;
};

exports.dispatchWords = (input) => {
  sortedInput = input.sort((a, b) => a.localeCompare(b));
  let flattened = flattenDispatch(sortedInput);
  Object.keys(flattened).map(async (v) => {
    let wordArr = flattened[v];
    let docu = await EntrySchema.findOne({ key: v });
    await updateDispatch(v, wordArr, docu);
  });
  // input.map(async (i) => {
  // });
};
