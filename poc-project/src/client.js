import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'kfk4h0rc',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2021-03-25',
})

export default client