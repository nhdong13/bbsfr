import VehiclesComponent from "../../components/Vehicles"
import { getVehiclesDirectory } from "../../lib/prismic/api"
import { getDataForMainNav } from "../../services/mainNav"
import { authenticationFromStamped } from "../../services/testimonial"
import { listVehicleService } from "../../services/vehicle"

export async function getStaticProps() {
  const dataNav = await getDataForMainNav()
  const vehiclesDirectory = await getVehiclesDirectory()
  const vehicles = await listVehicleService()
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
