export const textCategory = (title) => {
  let text_category=""
  switch(title) {
    case "New Motorcycles": 
      text_category = "new"
      break;
    case "Used Motorcycles": 
      text_category = "used"
      break;
    case "Road Gear": 
      text_category = "road"
      break;
    case "MX Gear": 
      text_category = "mx"
      break;
    case "Adventure Gear": 
      text_category = "adv"
      break;
    case "Parts & Accessories": 
      text_category = "par"
      break;
    default:
      text_category= ""
  }
  return text_category
}