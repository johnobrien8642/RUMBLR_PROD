import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache,
          ApolloProvider, HttpLink } from '@apollo/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';

import App from './components/App';
import './index.css';

import Queries from './graphql/queries'
import Mutations from './graphql/mutations'

const { IS_LOGGED_IN } = Queries;
const { VERIFY_USER, LOGOUT_USER } = Mutations;

const token = Cookies.get('auth-token');
const envURI = process.env.NODE_ENV === 'development' ? `http://localhost:8080/graphql` : 'https://seal-app-4r3si.ondigitalocean.app/graphql'

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    }
  }
});

const httpLink = new HttpLink({
  uri: envURI
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
  graphQLErrors.forEach(({ message, locations, path }) =>
    console.log(
      `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
    ),
  );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      UserType: {
        fields: {
          userFollows: {
            merge(existing = [], incoming = []) {
              return incoming
            }
          },
          tagFollows: {
            merge(existing = [], incoming = []) {
              return incoming
            }
          }
        }
      },
      Query: {
       fields: {
         fetchLikesRepostsAndComments: {
           merge: (existing = [], incoming = []) => {
             return incoming
           }
        },
        fetchUserFeed: {
          keyArgs: ['query'],
            merge: (existing = [], incoming = []) => {

            //post_form_util.js #updateCacheCreate and #updateCacheDelete,
            //object with __typename is added to the beginning of the array.
            //This tells merge function that we are adding or deleting a
            //post and would like the incoming array returned.
            if (incoming.length > 0 && "__typename" in incoming[0]) {
              return incoming.slice(1, incoming.length)
            } else {
              const elements = [...existing, ...incoming].reduce((array, current) => {
                return array.map(i => i.__ref).includes(current.__ref) ? array : [...array, current];
              }, []);

              return elements
            }
          }
        },
        fetchTagFeed: {
          keyArgs: ['query'],
            merge: (existing = [], incoming = []) => {

            //post_form_util.js #updateCacheCreate and #updateCacheDelete,
            //object with __typename is added to the beginning of the array.
            //This tells merge function that we are adding or deleting a
            //post and would like the incoming array returned.
            if (incoming.length > 0 && "__typename" in incoming[0]) {
              return incoming.slice(1, incoming.length)
            } else {
              const elements = [...existing, ...incoming].reduce((array, current) => {
                return array.map(i => i.__ref).includes(current.__ref) ? array : [...array, current];
              }, []);

              return elements
            }
          }
        },
        fetchAllUserActivity: {
          keyArgs: ['query'],
            merge: (existing = [], incoming = []) => {
            //post_form_util.js #updateCacheCreate and #updateCacheDelete,
            //object with __typename is added to the beginning of the array.
            //This tells merge function that we are adding or deleting a
            //post and would like the incoming array returned.
            if (incoming.length > 0 && "__typename" in incoming[0]) {
              return incoming.slice(1, incoming.length)
            } else {
              const elements = [...existing, ...incoming].reduce((array, current) => {
                return array.map(i => i.__ref).includes(current.__ref) ? array : [...array, current];
              }, []);

              return elements
            }
          }
        },
        fetchUserFollowers: {
          keyArgs: ['query'],
            merge: (existing = [], incoming = []) => {
            //post_form_util.js #updateCacheCreate and #updateCacheDelete,
            //object with __typename is added to the beginning of the array.
            //This tells merge function that we are adding or deleting a
            //post and would like the incoming array returned.
            if (incoming.length > 0 && "__typename" in incoming[0]) {
              return incoming.slice(1, incoming.length)
            } else {
              const elements = [...existing, ...incoming].reduce((array, current) => {
                return array.map(i => i.__ref).includes(current.__ref) ? array : [...array, current];
              }, []);

              return elements
            }
          }
        },
        fetchFollowedUsers: {
          keyArgs: ['query'],
            merge: (existing = [], incoming = []) => {
            //post_form_util.js #updateCacheCreate and #updateCacheDelete,
            //object with __typename is added to the beginning of the array.
            //This tells merge function that we are adding or deleting a
            //post and would like the incoming array returned.
            if (incoming.length > 0 && "__typename" in incoming[0]) {
              return incoming.slice(1, incoming.length)
            } else {
              const elements = [...existing, ...incoming].reduce((array, current) => {
                return array.map(i => i.__ref).includes(current.__ref) ? array : [...array, current];
              }, []);

              return elements
            }
          }
        },
        fetchAllTagFeed: {
          keyArgs: ['query'],
            merge: (existing = [], incoming = []) => {
            //post_form_util.js #updateCacheCreate and #updateCacheDelete,
            //object with __typename is added to the beginning of the array.
            //This tells merge function that we are adding or deleting a
            //post and would like the incoming array returned.
            if (incoming.length > 0 && "__typename" in incoming[0]) {
              return incoming.slice(1, incoming.length)
            } else {
              const elements = [...existing, ...incoming].reduce((array, current) => {
                return array.map(i => i.__ref).includes(current.__ref) ? array : [...array, current];
              }, []);

              return elements
            }
          }
        },
        fetchCheckOutTheseBlogs: {
          merge: (existing = [], incoming = []) => {
            return incoming
          }
        }
      }
    }
  }
  }),
  errorLink
})

client.writeQuery({
  query: IS_LOGGED_IN,
  data: {
    isLoggedIn: Boolean(token)
  }
})

if (token) {
  client
    .mutate({ mutation: VERIFY_USER, variables: { token } })
    .then(({ data }) => {
      client.writeQuery({
        query: IS_LOGGED_IN,
        data: {
          isLoggedIn: data.verifyUser.loggedIn
        }
      })
    })
}

setInterval(() => {

  if (Cookies.get('auth-token')) {
    client
      .mutate({ mutation: LOGOUT_USER, variables: { token: token } })
      .then(({ data }) => {

        client.writeQuery({
          query: IS_LOGGED_IN,
          data: {
            isLoggedIN: data.logoutUser.loggedIn
          }
        })

        Cookies.set('auth-token', '')
        Cookies.set('currentUser', '')

        alert("This clone logs you out automatically after two hours. If you'd like to continue checking out Rumblr simply log back in.")
      })
  }

}, 1000*60*60*2)

const Root = () => {
  var nodeEnv = process.env.NODE_ENV

  if (nodeEnv === 'development') {
    return (
      <ApolloProvider client={client}>
        <HashRouter>
          <App />
        </HashRouter>
      </ApolloProvider>
    )
  } else {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));


