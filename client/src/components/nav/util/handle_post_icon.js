const handlePostIcon = (activity) => {
  
  var post = activity.post.kind === 'Repost' ? activity.post.post : activity.post

  if (activity) {
    if (post.kind === 'TextPost') {
      return (
        <img
          className='textPostIcon'
          src='/assets/text-post-icon.png'
          alt='text post icon'
        />
      )
    } else if (post.kind === 'PhotoPost') {
      return (
        <img
          className='photoPostIcon'
          src='/assets/photo-post-mobile-icon.png'
          alt='photo post mobile icon'
        />
      )
    } else if (post.kind === 'QuotePost') {
      return (
        <img
          className='quotePostIcon'
          src='/assets/quote-post-mobile-icon.png'
          alt='quote post mobile icon'
        />
      )
    } else if (post.kind === 'LinkPost') {
      return (
        <img
          className='linkPostIcon'
          src='/assets/link-post-mobile-icon.png'
          alt='link post mobile icon'
        />
      )
    } else if (post.kind === 'ChatPost') {
      return (
        <img
          className='chatPostIcon'
          src='/assets/chat-post-mobile-icon.png'
          alt='chat post mobile icon'
        />
      )
    } else if (post.kind === 'AudioPost') {
      return (
        <img
          className='audioPostIcon'
          src='/assets/audio-post-mobile-icon.png'
          alt='audio post mobile icon'
        />
    
      )
    } else if (post.kind === 'VideoPost') {
      return (
        <img
          className='videoPostIcon'
          src='/assets/video-post-mobile-icon.png'
          alt='video post mobile icon'
        />
      )
    }
  }
}

export default handlePostIcon;