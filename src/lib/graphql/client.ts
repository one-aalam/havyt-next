import { createClient } from 'urql';

export const client = createClient({
    url:  process.env.GRAPHQL_ENDPOINT || 'http://localhost:3000/api/graphql',
})
