import { Configuration } from 'webpack'
import merge from 'webpack-merge'
import common from './webpack.common'

const dev: Configuration = {
    mode: 'production',
    devtool: 'source-map',
}

export default merge(common, dev)