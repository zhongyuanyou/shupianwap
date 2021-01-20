import { CHIPS_WAP_BASE_URL } from '../../config/constant'

const spreadApi = {
  list: `${CHIPS_WAP_BASE_URL}/nk/spread/v1/list.do`,
}
const plannerApi = {
  planner: `${CHIPS_WAP_BASE_URL}/nk/spread/v1/planner.do`,
}
export { spreadApi, plannerApi }
