const parseSender = (h) => {
  if (!h) return "";
  let sender = /("?)([',\w, -]+)(\.[a-z]+)?(")?(?= <)/;
  return h.from.match(sender)[2];
};

const stripEmojis = (m) => {
  if (!m) return "";
  const teminator3000 =
    /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;
  const stripped = m.subject.replace(teminator3000, "");
  return stripped;
};

export default function nexus(message, keep) {
  const sender = parseSender(message).trim().split(" ");
  const subject = stripEmojis(message).trim().split(" ");
  return { sender, subject };
}
