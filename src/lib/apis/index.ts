import { Apis, Configuration } from '/@/lib/apis/generated'

const apis = new Apis(new Configuration({ basePath: '/api/v1' }))

export default apis
export * from '/@/lib/apis/generated'
