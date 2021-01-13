import VehiclesComponent from "../../components/Vehicles"
import { getVehiclesDirectory, getAllVehicles } from "../../lib/prismic/api"
import { getDataForMainNav } from "../../services/mainNav"
import { authenticationFromStamped } from "../../services/testimonial"

export async function getStaticProps({ params }) {
  const dataNav = await getDataForMainNav()
  const vehiclesDirectory = await getVehiclesDirectory()
  const vehicles = await getAllVehicles()
  const requestOptions = authenticationFromStamped()
  const resStamped = await fetch(process.env.STAMPED_API_URL, requestOptions)
  const testimonials = await resStamped.json()
  return {
    props: { dataNav, vehiclesDirectory, vehicles, testimonials },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

const VehiclesPage = ({ vehiclesDirectory, vehicles, testimonials }) => {
  return (
    <VehiclesComponent
      vehiclesDirectory={vehiclesDirectory}
      vehicles={vehicles}
      testimonials={testimonials}
    />
  )
}
export default VehiclesPage
