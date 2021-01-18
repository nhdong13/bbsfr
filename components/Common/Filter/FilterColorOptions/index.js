import { Swatch } from "@sajari/react-components"

const ColorFilter = ({ setSelected, setFilterChanged, selected, options }) => {
  const optionKeys = options.map((o) => o.label)
  const validColors = [
    "White",
    "Silver",
    "Black",
    "Pink",
    "Magenta",
    "Red",
    "Beige",
    "Orange",
    "Brown",
    "Yellow",
    "Green",
    "Azure",
    "Aqua",
    "Teal",
    "Turquoise",
    "Blue",
    "ElectricBlue",
    "Lilac",
    "Purple",
    "Violet",
  ].filter((c) => optionKeys.some((o) => o.includes(c)))

  if (validColors.length === 0) {
    return null
  }

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        {selected.length > 0 ? (
          <p
            style={{ color: "#ffb00f" }}
            className="text-xs text-blue-500 hover:underline uppercase p-0 bg-transparent focus:outline-none"
            onClick={() => {
              setFilterChanged(true)
              setSelected([])
            }}
          >
            Reset
          </p>
        ) : null}
      </div>

      <Swatch checkedColors={selected} onChange={setSelected}>
        {validColors.map((color) => {
          const Component = Swatch.Color[color]
          return <Component key={color} />
        })}
      </Swatch>
    </div>
  )
}

export default ColorFilter
