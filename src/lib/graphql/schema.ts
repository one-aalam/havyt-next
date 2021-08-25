import { makeSchema } from 'nexus'
import path from 'path'
import { applyMiddleware } from 'graphql-middleware'
import * as types from './types'
import { permissions } from './shield'


export const schema = applyMiddleware(makeSchema({
    types,
    contextType: {
        module: path.join(process.cwd(), 'src', 'lib', 'graphql', 'context.ts'),
        export: 'Context'
    },
    outputs: {
        typegen: path.join(process.cwd(), "node_modules", "@types", "nexus-typegen", "index.d.ts"),
        schema: path.join(process.cwd(), 'src', 'lib', 'graphql', 'generated', 'schema.graphql')
    },
}), permissions );
