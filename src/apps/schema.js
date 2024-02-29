import authSchemas from './auth/auth.schema.js'
import commonSchemas from './common/common.schema.js'

const sharedSchemas = [...authSchemas, ...commonSchemas]

export default sharedSchemas
