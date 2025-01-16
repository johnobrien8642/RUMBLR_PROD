import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useLocation, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import Mutations from '../../graphql/mutations'
import Queries from '../../graphql/queries'
const { LOGIN_USER } = Mutations;
const { IS_LOGGED_IN } = Queries;

const Login = () => {
  let [email, setEmail] = useState('guest@email.com');
  let [password, setPassword] = useState('password');
  let [errorMessages, addErrorMessage] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      addErrorMessage(errorMessages.concat(location.state.errMessage))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [ loginUser ] = useMutation(LOGIN_USER, {
    onError(error) {
      addErrorMessage(errorMessages = [])
      error.graphQLErrors.forEach((error, i) => {
        addErrorMessage(errorMessages.concat(error.message))
      })
    },
    onCompleted({ loginUser }) {
      const { token, blogName } = loginUser;
      Cookies.set('auth-token', token)
      Cookies.set('currentUser', blogName)
      resetInputs();
      window.location.reload();
    },
    update(client, { data }) {
      client.writeQuery({
        query: IS_LOGGED_IN,
        data: {
          isLoggedIn: data.loginUser.loggedIn,
        }
      })
    }
  })

  const resetInputs = () => {
    setEmail(email = '');
    setPassword(password = '');
    addErrorMessage(errorMessages = []);
  }

  return (
    <div>
      <div
        className='loginForm'
      >
        <div
          className='greetingHeader'
        >
          <h1>Rumblr</h1>
          <p>
            Welcome to Rumblr, a clone of Tumblr using
            MongoDB, Express, React, Node, Apollo and GraphQL!
          </p>
            <a
              href={"https://github.com/johnobrien8642/RUMBLR_PROD"}
            >
                Go to Github repository
              </a>
          </div>

        <div
          className='greetingHeader'
        >
          <h1>Overview</h1>
          <p>
            This is a fully functional and full-featured
            application. There are over 90+ included features throughout this site.
            It is connected to both Mongodb Atlas as well as an AWS S3 bucket.
          </p>
          <p className='explainer-two' >
            A guest user has been pre-filled in the login form. Simply click Login to
            check out the site, or click Sign Up in the top right to create a new user.
          </p>
        </div>


        <form
          onSubmit={e => {
            e.preventDefault();
            loginUser({
              variables: {
                email,
                password
              }
              })
            }}
          >

          <ul
            className='authErrors'
          >
            {errorMessages.map((error, i) => {
                return <li key={i}>{error}</li>
              })}
            </ul>

          <input
            type='text'
            value={email}
            placeholder={'Email'}
            onChange={e => setEmail(email = e.target.value)}
          />
          <input
            type='password'
            value={password}
            placeholder={'Password'}
            onChange={e => setPassword(password = e.target.value)}
          />
          <button
            type='submit'
          >
            Login
          </button>
          <Link
            to='/register'
          >
            Don't have an account? Sign up!
          </Link>
        </form>
      </div>
          <div
            className='login-form-explainer'
          >
            <h1>What can I do after I log in?</h1>
            <p>Rumblr is a full-featured clone of Tumblr. In the app, you can:</p>
            <ul>
                <li>Make one of 7 different kinds of posts</li>
                <li>Add photos to any of your posts. Drag and Drop photos to reorder them</li>
                <li>Fully edit any of your posts</li>
                <li>Click on Notes in the bottom right corner of posts and comment, or see activity for a post</li>
                <li>Click on any tag in a post and be taken to a tag feed</li>
                <li>Get an infinite scroll in your user feed for all users and tags you follow</li>
                <li>Like posts</li>
                <li>Repost posts</li>
                <li>See your Activity in the lightning icon in the top right</li>
                <li>Follow users or tags!</li>
                <li>Go to the Discover page through the compass in the top right and see recommended posts</li>
                <li>Follow other recommended users in the suggestion box to the middle right</li>
                <li>Log out, click Sign Up and create a completely new user if you want!</li>
                <li>Click on your User icon in the top right and see your likes, Follows and Followers, Posts, etc</li>
                <li>In your User dropdown, go to Activity and see your activity again with more detail</li>
                <li>Create new tags when you create a post, or select existing ones, type "#" in the search bar to see some existing ones</li>
            </ul>
          </div>
    </div>
  )
}

export default Login;
