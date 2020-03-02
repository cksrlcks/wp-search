import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: "https://batdog.kr/graphql"
})

export default client;