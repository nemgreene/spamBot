import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

function Mail() {
  const [anim, setAnim] = useState(true);
  const toggle = useSpring({ x: anim ? 1 : 0 });

  const rand = (c) => {
    return [
      Math.floor(Math.random() * c) + 1,
      Math.floor(Math.random() * c) + 1,
      Math.floor(Math.random() * c) + 1,
    ];
  };
  // floating
  const { xyz } = useSpring({
    config: {
      duration: 1000,
    },
    loop: true,
    from: { xyz: [0, 0, 0] },
    to: [
      { xyz: rand(10) },
      { xyz: rand(6) },
      { xyz: rand(10) },
      { xyz: rand(5) },
      { xyz: rand(12) },
      { xyz: rand(7) },
      { xyz: rand(10) },
      { xyz: rand(5) },
      { xyz: [0, 0, 0] },
    ],
  });

  const style = useSpring({
    opacity: toggle.x
      .to({
        range: [0, 1],
        output: [0, 1],
      })
      .to((x) => `${x}`),
    display: toggle.x
      .to({
        range: [0, 1],
        output: [0, 1],
      })
      .to((x) => {
        return `${x}`;
      }),
  });

  const str =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus totam fugit, quia velit earum nobis exercitationem, dolor maiores labore";
  const dict = str.split(" ");

  return (
    <animated.div className="mailContainer">
      <animated.div
        className="mailIcon"
        style={{
          transform: xyz.to((x, y, z) => `translate3d(${x}px, ${y}px, ${z}px)`),
        }}
      >
        icon
      </animated.div>
      <div className="mailPeriphery">
        {dict.map((v, i) => {
          return (
            <div className="peripheryItem" key={i}>
              {new Array(i).fill(undefined).map((v, i) => {
                return <div className="block" key={i}></div>;
              })}
              <div className="peripheryLabel">{v}</div>
            </div>
          );
        })}
      </div>
    </animated.div>
  );
}

export default Mail;
