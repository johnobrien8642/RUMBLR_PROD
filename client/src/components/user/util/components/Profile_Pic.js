import React, { } from 'react';
import { Link } from 'react-router-dom';

const ProfilePic = ({
  user,
  activity,
  standaloneLink
}) => {
  
  if (user) {
    let iconUrls = {
      user: user.profilePic ? user.profilePic.src : null,
      default: './assets/default-user-pro-pic.png'
    }

    const handleActivityIcon = (activity) => {
      if (activity) {
        if (activity.kind === 'Mention') {
          return (
            <div
              className='mentionActivityIcon'
            >
              <img
                src='/assets/at-symbol-icon.png'
                alt='at symbol icon'
              />
            </div>
          )
        } else if (activity.kind === 'Repost') {
          return (
            <div
              className='repostActivityIcon'
            >
              <img
                src='/assets/reblog-icon-white.png'
                alt='reblog icon white'
              />
            </div>
          )
          } else if (activity.kind === 'Comment') {
          return (
            <div
              className='commentActivityIcon'
            >
              <img
                src='/assets/speech-bubble-icon-white.png'
                alt='speech bubble icon white'
              />
            </div>
          )
        } else if (activity.kind === 'Follow') {
          return (
            <div
              className='followActivityIcon'
            >
              <img
                src='/assets/add-user-male-icon-white.png'
                alt='add user icon male white'
              />
            </div>
          )
        } else if (activity.kind === 'Like') {
          return (
            <div
              className='likeActivityIcon'
            >
              <img
                src='/assets/like-icon-white.png'
                alt='like icon white'
              />
            </div>
          )
        }
      }
    }

    if (standaloneLink) {
      return (
        <React.Fragment>
          <Link
            className='standAloneLink'
            to={`/view/blog/${user.blogName}`}
            >
            <img
              className='profilePic'
              src={user.profilePic ? iconUrls.user : iconUrls.default }
              alt='user profile pic'
            />
          </Link>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <img
            className='profilePic'
            src={user.profilePic ? iconUrls.user : iconUrls.default }
            alt='user profile pic'
          />
          {handleActivityIcon(activity)}
        </React.Fragment>
      )
    }  
  } else {
    return (
      <div>
      </div>
    )
  }
}

export default ProfilePic;