import { Pipeline, Variables } from "@sajari/react-search-ui"
import { getConfigPipeline } from "../../services/getPipelineSajari"

export const pipelineConfig = new Pipeline(
  { ...getConfigPipeline("best-buy") },
  "query"
)

export const variablesConfig = (filter) =>
  new Variables({
    resultsPerPage: 20,
    q: "",
    filter: filter || "",
  })
