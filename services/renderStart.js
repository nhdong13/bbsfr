import Image from "next/image"

export const renderStart = (rate, width, height, max = 5) => {
  let el = []
  const loop = () => {
    for (let i = 1; i <= max; i++) {
      if (i + 1 <= rate) {
        el.push(
          <Image
            key={i}
            width={width}
            height={height}
            alt="start rating"
            src="/icons/start-full.svg"
          />
        )
      } else if (
        `${rate}`.includes(".") &&
        +`${rate}`.split(".")[0] + 1 === i + 1
      ) {
        el.push(
          <Image
            key={i}
            width={width}
            height={height}
            alt="start rating"
            src="/icons/start-path.svg"
          />
        )
      } else {
        el.push(
          <Image
            key={i}
            width={width}
            height={height}
            alt="start rating"
            src="/icons/start-empty.svg"
          />
        )
      }
    }
    return el
  }
  return (
    <div className="start" style={{ display: "flex" }}>
      {loop()}
    </div>
  )
}
