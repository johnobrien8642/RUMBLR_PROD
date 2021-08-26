import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import Search from '../search/Search';
import UserDetails from './User_Details';
import Activity from './Activity';
import ActivityCountIcon from '../nav/Activity_Count_Icon';

const BrowserNav = ({
  user,
  userDetailsCounts,
  loggedInBool,
}) => {
  let [searchClose, closeSearch] = useState(false)
  let [activityClose, closeActivity] = useState(false)
  let [detailsClose, closeDetails] = useState(false)
  let [activityOpen, setActivityOpen] = useState(false)
  let [detailsOpen, setDetailsOpen] = useState(false)
  let cursorId = useRef(new Date().getTime())
  let totalActivityCountRef = useRef(0)
  
  if (loggedInBool.isLoggedIn) {
    return (
      <div
        className='browserNav loggedIn'
      >
        <div
          className='searchAndLogo'
        >
          <div
            className='logo'
          >
            <Link
              to='/dashboard'
            >
              <img 
                src="./assets/main-logo.png"
                alt='main logo'
              />
            </Link>
          </div>
            <Search
              user={user}
              searchClose={searchClose}
              closeSearch={closeSearch}
              detailsOpen={detailsOpen}
              setDetailsOpen={setDetailsOpen}
              activityOpen={activityOpen}
              setActivityOpen={setActivityOpen}
            />
        </div>

        <div
          className='navTools'
        >
          <div
            className='homeIcon'
          >
            <Link
              to='/dashboard'
              onClick={() => {
                if (document.querySelector('.searchBar')) {
                  document.querySelector('.searchBar').blur()
                }

                if (document.querySelector('.activity')) {
                  document.querySelector('.activity').blur()
                }

                if (document.querySelector('.userDetails')) {
                  document.querySelector('.userDetails').blur()
                }

                closeSearch(searchClose = true)
                setActivityOpen(activityOpen = false)
                setDetailsOpen(detailsOpen = false)
              }}
            >
              <img
                src='./assets/home-icon.png'
                alt='home icon'
              />
            </Link>
          </div>

          <div
            className='discoverIcon'
          >
            <Link
              to='/discover'
              onClick={() => {
                closeSearch(searchClose = true)
                setActivityOpen(activityOpen = false)
                setDetailsOpen(detailsOpen = false)
              }}
            >
              <img 
                src='./assets/compass-icon.png'
                alt='compass icon'
              />
            </Link>
          </div>

          <div
            className='activityIcon'
            tabIndex={0}
            onClick={() => {
          
              if (activityOpen) {
                setActivityOpen(activityOpen = false)
              } else {
                totalActivityCountRef.current = 0
                cursorId.current = new Date().getTime()
                setActivityOpen(activityOpen = true)
              }

              if (detailsOpen) {
                setDetailsOpen(detailsOpen = false)
              }

              if (!searchClose) {
                closeSearch(searchClose = true)
              }
            }}
          >
            <img 
              src='./assets/lightning-bolt-icon.png'
              alt='lightning bolt icon'
            />
            {/* {renderTotalCount(totalActivityCountRef, activityCounts, activityOpen)} */}
            <ActivityCountIcon
              cursorId={cursorId.current}
            />
          </div>
          
          <Activity
            activityClose={activityClose}
            closeActivity={closeActivity}
            detailsClose={detailsClose}
            closeDetails={closeDetails}
            detailsOpen={detailsOpen}
            setDetailsOpen={setDetailsOpen}
            activityOpen={activityOpen}
            setActivityOpen={setActivityOpen}
          />

          <div
            className='userIcon'
            tabIndex={0}
            onClick={() => {
              if (detailsOpen) {
                setDetailsOpen(detailsOpen = false)
              } else {
                setDetailsOpen(detailsOpen = true)
              }
            
              if (activityOpen) {
                setActivityOpen(activityOpen = false)
              }

              if (!searchClose) {
                closeSearch(searchClose = true)
              }
            }}
          >
            <img
              src='./assets/user-icon.png'
              alt='user icon'
            />
          </div>

          <UserDetails
            user={userDetailsCounts.user ? userDetailsCounts.user : null}
            profilePic={userDetailsCounts.user ? userDetailsCounts.user.profilePic : null}
            blogName={userDetailsCounts.user ? userDetailsCounts.user.blogName : null}
            blogDescription={userDetailsCounts.user ? userDetailsCounts.user.blogDescription : null}
            totalLikeCount={userDetailsCounts.user ? userDetailsCounts.user.totalLikeCount : null}
            userFollowCount={userDetailsCounts.user ? userDetailsCounts.user.userFollowCount : null}
            userPostsCount={userDetailsCounts.user ? userDetailsCounts.user.userPostsCount : null}
            followersCount={userDetailsCounts.user ? userDetailsCounts.user.followersCount : null}
            detailsClose={detailsClose}
            closeDetails={closeDetails}
            activityClose={activityClose}
            closeActivity={closeActivity}
            detailsOpen={detailsOpen}
            setDetailsOpen={setDetailsOpen}
            activityOpen={activityOpen}
            setActivityOpen={setActivityOpen}
          />
        </div>
      </div>
    )
  } else {
    return (
      <div
        className='browserNav loggedOut'
      >
        <div
          className='searchAndLogo'
        >
          <div
            className='logo'
          >
            <img
              src="./assets/main-logo.png"
              alt=''  
            />
          </div>
          <Search />
        </div>

        <div
          className='auth'
        >
          <Link
            className='login'
            to='/login'
          >
            Log in
          </Link>
              
          <Link
            className='register'
            to='/register'
            onClick={e => {
              e.stopPropagation()
            }}
          >
            Sign up
          </Link>
        </div>
      </div>
    )
  }
}

export default BrowserNav;