import {
    getGraphQLParameters,
    processRequest,
    renderGraphiQL,
    shouldRenderGraphiQL,
} from 'graphql-helix'
import { NextApiRequest, NextApiResponse } from 'next/types'
import { schema } from '~/lib/graphql/schema'
import { createContext } from '~/lib/graphql/context'

const graphql = async (req: NextApiRequest, res: NextApiResponse) => {
    // We don't wanna pass everything we're getting to the GQL processor (Helix). Let's do a bit of normalization
    const gqlReq = {
        body: req.body,
        headers: req.headers,
        method: req.method,
        query: req.query,
    }

    // Is it for GraphiQL render?
    if (shouldRenderGraphiQL(gqlReq)) {
        res.send(renderGraphiQL({ endpoint: '/api/graphql' }));
    } else {
        // No? Let's extract the needed params for the GQL processor (Helix)
        const { operationName, query, variables } = getGraphQLParameters(gqlReq);

        // Get the result
        const result = await processRequest({
            schema,
            query,
            variables,
            operationName,
            request: gqlReq,
            contextFactory: async() => await createContext({
                req,
                res
            })
        });

        // HTTP response? No Websocket? No SSE?
        if (result.type === 'RESPONSE') {

            // Yup! it's some work...but it's cool, coz we have control on what we're sending
            result.headers.forEach(({ name, value }) => {
              res.setHeader(name, value)
            });
            res.status(result.status);
            res.json(result.payload);
        } else {
            // TODO
            res.send({ errors: [{ message: 'Not Supported in this App' }] });
        }
    }

}

export default graphql
