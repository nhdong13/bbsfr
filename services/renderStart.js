import Image from "next/image"

export const renderStart = (rate, width, height, max = 5) => {

  const container = (i, s) => {
    return (
      <div
        key={i}
        style={{
          position: "relative",
          width: `${width}`,
          height: `${height}`,
        }}
      >
        <Image loading="lazy" layout="fill" alt="start rating" src={`${s}`} />
      </div>
    )
  }
  let el = []
  const loop = () => {
    for (let i = 1; i <= max; i++) {
      if (i + 1 <= rate) {
        el.push(container(i, "/icons/start-full.svg"))
      } else if (
        `${rate}`.includes(".") &&
        +`${rate}`.split(".")[0] + 1 === i + 1
      ) {
        el.push(container(i, "/icons/start-path.svg"))
      } else {
        el.push(container(i, "/icons/start-empty.svg"))
      }
    }
    return el
  }
  return <div style={{ display: "flex" }}>{loop()}</div>
}
