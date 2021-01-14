import VehicleComponent from "../../../components/Vehicles/Vehicle"
import { getAllVehicles, getVehicleByUid } from "../../../lib/prismic/api"
import { getDataForMainNav } from "../../../services/mainNav"
import { authenticationFromStamped } from "../../../services/testimonial"
import { Pipeline, Variables } from "@sajari/react-search-ui"
import { getConfigPipeline } from "../../../services/getPipelineSajari"
import { search } from "@sajari/server"

const pipeline = new Pipeline({ ...getConfigPipeline("best-buy") }, "query")
var searchObj = { variables: null }

const initVariable = (params) => {
  //Filter options will replace base params for per page --> this is code demo
  searchObj.variables = new Variables({
    resultsPerPage: 20,
    q: "",
  })
}

export async function getStaticPaths() {
  const paths = []
  const vehicleList = await getAllVehicles()
  if (vehicleList.length > 0) {
    for (const vehicle of vehicleList) {
      if (vehicle?.node?._meta?.uid) {
        paths.push(`/vehicles/${vehicle.node._meta.uid}`)
      }
    }
  }
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const dataNav = await getDataForMainNav()
  const resStamped = await fetch(
    process.env.STAMPED_API_URL,
    authenticationFromStamped()
  )
  const testimonials = await resStamped.json()
  const vehicle = await getVehicleByUid(params?.vehicle)
  initVariable(params)
  const initialResponse = await search({
    pipeline,
    variables: searchObj.variables,
  })
  return {
    props: { dataNav, vehicle, initialResponse, testimonials },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

const VehiclePage = ({ vehicle, testimonials, initialResponse, params }) => {
  if (!search.variables) {
    initVariable(params)
  }
  return (
    <VehicleComponent
      initialResponse={initialResponse}
      pipeline={pipeline}
      variables={searchObj.variables}
      vehicle={vehicle}
      testimonials={testimonials}
    />
  )
}
export default VehiclePage
