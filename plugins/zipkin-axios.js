const { Instrumentation } = require('zipkin')

function wrapAxios(axios, options = {}) {
  const { tracer } = options
  let remoteServiceName = options.remoteServiceName

  const zipkinRecordRequest = (config) =>
    tracer.scoped(() => {
      if (config.custom) {
        remoteServiceName = config.custom.remoteServiceName
          ? config.custom.remoteServiceName
          : options.remoteServiceName
      }
      const setOptions = {
        tracer,
        remoteServiceName,
      }
      const instrumentation = new Instrumentation.HttpClient(setOptions)

      const newConfig = instrumentation.recordRequest(
        config,
        config.url,
        config.method
      )
      newConfig.traceId = tracer.id
      return newConfig
    })
  const zipkinRecordResponse = (res) =>
    tracer.scoped(() => {
      const setOptions = {
        tracer,
        remoteServiceName,
      }
      const instrumentation = new Instrumentation.HttpClient(setOptions)
      instrumentation.recordResponse(res.config.traceId, res.status)
      return res
    })
  const zipkinRecordError = (error) =>
    tracer.scoped(() => {
      const setOptions = {
        tracer,
        remoteServiceName,
      }
      const instrumentation = new Instrumentation.HttpClient(setOptions)
      if (error.config) {
        const { traceId } = error.config
        if (error.response) {
          instrumentation.recordResponse(traceId, error.response.status)
        } else {
          instrumentation.recordError(traceId, error)
        }
      } // otherwise the error preceded the request interceptor
      return Promise.reject(error)
    })
  let axiosInstance = axios
  if (axios.create) {
    axiosInstance = axios.create()
  }
  axiosInstance.interceptors.request.use(zipkinRecordRequest, zipkinRecordError)
  axiosInstance.interceptors.response.use(
    zipkinRecordResponse,
    zipkinRecordError
  )
  return axiosInstance
}

module.exports = wrapAxios
