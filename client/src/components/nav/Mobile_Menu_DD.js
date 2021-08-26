import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Cookies from 'js-cookie';

import Logout from '../auth/Logout';

import Queries from '../../graphql/queries.js';
import PostFormUtil from '../posts/util/functions/post_form_util.js';
const { FETCH_ACTIVITY_COUNTS } = Queries;
const { allowScroll } = PostFormUtil;

const MobileMenuDD = ({
  menuOpen,
  openMenu,
  settingsOpen,
  openSettings,
  userDetailsCounts,
  scrollYRef2
}) => {
  let cursorId = useRef(new Date().getTime())

  useEffect(() => {
    if (!menuOpen || menuOpen) {
      window.scrollTo(0, scrollYRef2.current)
    }

    //eslint-disable-next-line
    return () => {
      refetch()
    }
  }, [menuOpen, settingsOpen, scrollYRef2])

  let { data, refetch } = useQuery(FETCH_ACTIVITY_COUNTS, {
    variables: {
      query: Cookies.get('currentUser'),
      cursorId: cursorId.current.toString()
    },
    pollInterval: 10000
  })

  const { user } = userDetailsCounts;

  const renderActivityCount = () => {
    if (data) {
      if (data.fetchActivityCount) {
        return <span className='count'>{data.fetchActivityCount}</span>
      } else {
        return <span className='count'></span>
      }
    }
  }

  if (user) {
    return (
      <React.Fragment> 
        <div
          className={menuOpen && !settingsOpen ? 'mobileMenuDD open' : 'mobileMenuDD'}
        >
          <Link
            to='/dashboard/create'
            className='mobileMenuItem createAPost'
            onClick={() => {
              allowScroll(document)
              openMenu(menuOpen = false)
            }}
          >
            <div>
            <img
              src='./assets/edit-icon-white.png'
              alt='edit icon white'
            />
            <span>Create a post</span>
            </div>
          </Link>
    
  
          <div
            className='mobileMenuItem'
          >
            <Link
              className='dashboard'
              to='/dashboard'
                onClick={() => {
                  allowScroll(document)
                  openMenu(menuOpen = false)
                }}
            >
              <img
                src='./assets/home-icon.png'
                alt='home icon white'
              />
              <span>Dashboard</span>
            </Link>
          </div>
  
          <div
            className='mobileMenuItem'
          >
            <Link
              className='discover'
              to='/discover'
              onClick={() => {
                allowScroll(document)
                openMenu(menuOpen = false)
              }}
            >
              <img
                src='./assets/compass-icon.png'
                alt='compass icon'
              />
              <span>Discover</span>
            </Link>
          </div>
  
          <div
            className='mobileMenuItem'
            >
            <Link
              className='activity'
              to={`/activity`}
              onClick={() => {
                cursorId.current = new Date().getTime()
                openMenu(menuOpen = false)
                allowScroll(document)
              }}
            >
              <img
                src='./assets/lightning-bolt-icon.png'
                alt='lightning bolt icon'
              />
              <span>Activity</span>
            </Link>
  
            
            {renderActivityCount()}
          </div>
  
          <div
            className='mobileMenuItem'
          >
            <Link
              className='likes'
              to='/likes'
              onClick={() => {
                allowScroll(document)
                openMenu(menuOpen = false)
              }}
            >
              <img 
                src='./assets/like-icon-white.png'
                alt='like icon white'
              />
                <span>Likes</span>
            </Link>
            <span className='count'>{user.totalLikeCount}</span>
          </div>
  
          <div
            className='mobileMenuItem'
          >
            <Link 
              className='following'
              to='/following'
              onClick={() => {
                allowScroll(document)
                openMenu(menuOpen = false)
              }}
            >
              <img
                src='./assets/user-icon-white.png'
                alt='user icon white'
              />
                <span>Following</span>
            </Link>
            <span className='count'>{user.userFollowCount}</span>
          </div>
  
          <div
            className='mobileMenuItem'
            onClick={() => {
              allowScroll(document)
              openMenu(menuOpen = false)
            }}
          >
            <Link
              className='settings'
              to='/settings/account'
            >
              <img
                src='./assets/settings-icon-white.png'
                alt='settings icon white'
              />
              <span>Settings</span>
            </Link>
          </div>
  
          <div
            className='mobileMenuItem blogDetailHeader'
          >
            <Link
              to={`/view/blog/${user.blogName}`} 
              onClick={() => {
                allowScroll(document)
                openMenu(menuOpen = false)
              }}
            >
              <h3>{user.blogName}</h3>
              <p>{user.blogDescription}</p>
            </Link>
          </div>
  
          <div
            className='mobileMenuItem blogDetailData'
          >
            <Link
              to={`/view/blog/${user.blogName}`}
              onClick={() => {
                allowScroll(document)
                openMenu(menuOpen = false)
              }}
            >
              <p>Posts</p>
            </Link>
            <span className='count'>{user.userPostsCount}</span>
          </div>
  
          <div
            className='mobileMenuItem blogDetailData'
          >
            <Link
              to={`/followers`}
              onClick={() => {
                allowScroll(document)
                openMenu(menuOpen = false)
              }}
            >
              <p>Followers</p>
            </Link>
            <span className='followerCount'>{user.followersCount}</span>
          </div>
          <Logout />
        </div>
        <div
          className={menuOpen ? 'mobileMenuDDModal open' : 'mobileMenuDDModal'}
          onClick={() => {
            allowScroll(document)
            openMenu(menuOpen = false)
          }}
        />
      </React.Fragment>
    )
  } else {
    return (
      <div>
      </div>
    )

  }
}

export default MobileMenuDD;