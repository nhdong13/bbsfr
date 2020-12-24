import Item from "./Item"
import Money from "../Money"

export const generateCart = (items, removeItem, updateItem, viewOnly) => {
  return items?.map(({ id, variant, quantity, totalPrice }, index) => (
    <Item
      key={id ? `id-${id}` : `idx-${index}`}
      index={index}
      id={variant?.product?.id || ""}
      name={variant?.product?.name || ""}
      maxQuantity={variant.quantityAvailable || quantity}
      quantity={quantity}
      thumbnail={variant?.product?.thumbnail}
      totalPrice={<Money money={totalPrice?.gross} supStyle={true} />}
      unitPrice={
        <Money money={variant?.pricing?.price?.gross} supStyle={true} />
      }
      onRemove={() => removeItem(variant.id)}
      onQuantityChange={(quantity) => updateItem(variant.id, quantity)}
      sku={variant.sku}
      viewOnly={viewOnly}
      quantityAvailable={variant.quantityAvailable}
      attributes={variant.attributes?.map((attribute) => {
        return {
          attribute: {
            id: attribute.attribute.id,
            name: attribute.attribute.name || "",
          },
          values: attribute.values.map((value) => {
            return {
              id: value?.id,
              name: value?.name || "",
              value: value?.value,
            }
          }),
        }
      })}
    />
  ))
}

export const buildCartItem = (data) => {
  const { variants, ...product } = data

  const variant = variants.find((variant) => variant.quantityAvailable)
  return {
    quantity: 1,
    totalPrice: variant.pricing.price,
    variant: {
      ...variant,
      product,
    },
  }
}
