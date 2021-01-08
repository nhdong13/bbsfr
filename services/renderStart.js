import Image from "next/image"

export const renderStart = (
  rate,
  width,
  height,
  max = 5,
  starType = "productStar"
) => {
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
        <Image loading="eager" layout="fill" alt="start rating" src={`${s}`} />
      </div>
    )
  }
  let el = []
  const loop = () => {
    for (let i = 1; i <= max; i++) {
      if (i <= `${rate}`.split(".")[0]) {
        el.push(container(i, `/icons/${starType}/start-full.svg`))
      } else if (
        `${rate}`.includes(".") &&
        +`${rate}`.split(".")[0] + 1 === i
      ) {
        el.push(container(i, `/icons/${starType}/start-path.svg`))
      } else {
        el.push(container(i, `/icons/${starType}/start-empty.svg`))
      }
    }
    return el
  }
  return <div style={{ display: "flex" }}>{loop()}</div>
}
