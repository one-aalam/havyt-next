import { makeSchema } from 'nexus'
import path from 'path'
import * as types from './types'


export const schema = makeSchema({
    types,
    contextType: {
        module: path.join(process.cwd(), 'src', 'lib', 'graphql', 'context.ts'),
        export: 'Context'
    },
    outputs: {
        typegen: path.join(process.cwd(), "node_modules", "@types", "nexus-typegen", "index.d.ts"),
        schema: path.join(process.cwd(), 'src', 'lib', 'graphql', 'generated', 'schema.graphql')
    },
});
