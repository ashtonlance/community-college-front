import { setConfig } from '@faustwp/core'
import ApolloClientOptionsPlugin from 'plugins/ApolloClientOptionsPlugin'
import UploadPlugin from 'plugins/UploadPlugin'
import possibleTypes from './possibleTypes.json'
import templates from './wp-templates'

/**
 * @type {import('@faustwp/core').FaustConfig}
 **/
export default setConfig({
  templates: templates,
  experimentalPlugins: [new UploadPlugin(), new ApolloClientOptionsPlugin()],
  possibleTypes,
  usePersistedQueries: true,
})
