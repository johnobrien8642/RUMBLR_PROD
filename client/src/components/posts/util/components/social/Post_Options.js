import React from 'react'; 
import { useQuery } from '@apollo/client';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';

import LikeButton from './Like_Button'

import Queries from '../../../../../graphql/queries';
import PostFormUtil from '../../functions/post_form_util.js';
const { DOES_USER_LIKE_POST } = Queries;
const { handlePostId, preventScroll } = PostFormUtil;

const PostOptions = ({ 
  post, 
  refetchNotes, 
  notesCount,
  notesActive, 
  setNotesActive, 
  toggleNotes,
  update,
  setUpdate,
  toggleUpdate,
  repostActive,
  setRepostActive,
  confirmDelete,
  setConfirmDelete
}) => {
  var postId = handlePostId(post);
  let location = useLocation();

  let { loading, error, data, refetch } = useQuery(DOES_USER_LIKE_POST,{
    variables: {
      user: Cookies.get('currentUser'),
      postId: postId
    }
  })

  if (loading) return 'Loading...';
  if (error) return `Error: ${error}`

  const { doesUserLikePost } = data;

  if (
      post.user.blogName === Cookies.get('currentUser') &&
      location.pathname !== '/discover'
    ) {
    return (
      <div
        className='postFooter'
      >
        <div
          className='notesBtn'
          onClick={() => {
            toggleNotes(notesActive, setNotesActive)
          }}
        >
          {notesCount} notes
        </div>
        
        <div
          className='postOptions'
        >
          <img
            className='commentBubbleBtn'
            src='/assets/speech-bubble-icon.png'
            alt='speech bubble icon'
            onClick={() => {
              toggleNotes()
            }}
          />

          <img 
            className='repostIcon'
            src='/assets/reblog-icon-black.png'
            alt='reblog icon'
            onClick={() => {
              setNotesActive(notesActive = false)
              setRepostActive(repostActive = true)
            }}
          />

          <LikeButton
            post={post}
            liked={doesUserLikePost}
            refetchDoesUserLikePost={refetch}
            refetchNotes={refetchNotes}
          />

          <img
            className='deletePostBtn'
            src='/assets/delete-icon.png'
            alt='delete icon'
            onClick={() => {
              setNotesActive(notesActive = false)
              setConfirmDelete(confirmDelete = true)
            }}
          />
          <img
            className='editPostBtn'
            src='/assets/edit-icon.png'
            alt='edit icon'
            onClick={() => {
              setNotesActive(notesActive = false)
              toggleUpdate(update, setUpdate)
            }}
          />
        </div>
      </div>
    )
  } else {
    return (
      <div
        className='postFooter'
      >
        <div
          className='notesBtn'
          onClick={() => {
            toggleNotes(notesActive, setNotesActive)
          }}
        >
          {notesCount} notes
        </div>
  
        <div
          className='postOptions'
        >
          <img
            className='commentBubbleBtn'
            src='/assets/speech-bubble-icon.png'
            alt='speech bubble icon'
            onClick={() => {
              toggleNotes()
            }}
          />

          <img 
            className='repostIcon'
            src='/assets/reblog-icon-black.png'
            alt='reblog icon'
            onClick={() => {
              setNotesActive(notesActive = false)
              setRepostActive(repostActive = true)
            }}
          />
          
          <LikeButton
            post={post}
            liked={doesUserLikePost}
            refetchDoesUserLikePost={refetch}
          />
        </div>
      </div>
    )
  }
};

export default PostOptions;