const randomizer = () => {
  return Math.floor(Math.random() * 1000);
};
export default function demoNexus(obj) {
  let ret = [{ [obj.sender]: randomizer() }];
  obj.subject.map((v, i) => {
    ret.push({ [v]: randomizer() });
  });
  return ret;
}
