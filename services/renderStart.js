import Image from "next/image";

export const renderStart = (
  rate,
  width,
  height,
  max = 5,
  starType = "productStar",
  marginRight = 0
) => {
  const container = (i, s, m) => {
    return (
      <div
        key={i}
        style={{
          position: "relative",
          width: `${width}`,
          height: `${height}`,
          marginRight: `${m}px`,
        }}
      >
        <Image loading="eager" layout="fill" alt="start rating" src={`${s}`} />
      </div>
    );
  };
  let el = [];
  const loop = () => {
    for (let i = 1; i <= max; i++) {
      let margin = i == max ? 0 : marginRight;
      if (i <= `${rate}`.split(".")[0]) {
        el.push(container(i, `/icons/${starType}/star-full.svg`, margin));
      } else if (
        `${rate}`.includes(".") &&
        +`${rate}`.split(".")[0] + 1 === i
      ) {
        el.push(container(i, `/icons/${starType}/star-path.svg`, margin));
      } else {
        el.push(container(i, `/icons/${starType}/star-empty.svg`, margin));
      }
    }
    return el;
  };
  return <div style={{ display: "flex" }}>{loop()}</div>;
};
