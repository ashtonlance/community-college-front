import { setConfig } from '@faustwp/core'
import templates from './wp-templates'
import possibleTypes from './possibleTypes.json'
import UploadPlugin from 'plugins/UploadPlugin'
import ApolloClientOptionsPlugin from 'plugins/ApolloClientOptionsPlugin'

/**
 * @type {import('@faustwp/core').FaustConfig}
 **/
export default setConfig({
  templates: templates,
  experimentalPlugins: [new UploadPlugin(), new ApolloClientOptionsPlugin()],
  possibleTypes,
  useGETForQueries: true,
  usePersistedQueries: true,
})
