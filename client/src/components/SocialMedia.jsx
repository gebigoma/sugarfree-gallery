import React, { Component } from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  RedditShareButton,
  TumblrShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
  RedditIcon,
  TumblrIcon,
  EmailIcon
} from 'react-share';
import '../styles/share.css'


class SocialMedia extends Component {
  
  render() {
    const { submission } = this.props
    const shareUrl = window.location.href;
    const title = submission.title;
    const hashtag = "#sugarfreegallery";
    const body = submission.body
    const media = submission.featuredImageUrl  

    return (
      <div>
       <div className="display">
        <FacebookShareButton 
          quote={title}
          url={shareUrl}
          hashtag={hashtag} 
          className="share-button">
            <FacebookIcon size={32} /> 
        </ FacebookShareButton>
        </div>

        <div className="display">
        <TwitterShareButton
          url={shareUrl}
          title={title}
          className="share-button">
          <TwitterIcon size={32} />
        </TwitterShareButton>
        </div>

        <div className="display">
        <PinterestShareButton
          url={shareUrl}
          media={media}
          windowWidth={1000}
          windowHeight={730}
          className="share-button">
          <PinterestIcon size={32} />
        </PinterestShareButton>
        </div>

        <div className="display">
        <RedditShareButton
          url={shareUrl}
          title={title}
          windowWidth={660}
          windowHeight={460}
          className="share-button">
          <RedditIcon size={32} />
        </RedditShareButton>
        </div>

        <div className="display">
        <TumblrShareButton
          url={shareUrl}
          title={title}
          windowWidth={660}
          windowHeight={460}
          className="share-button">
          <TumblrIcon size={32} />
        </TumblrShareButton>
        </div>

        <div className="display">
        <EmailShareButton
          url={shareUrl}
          subject={title}
          body={body}
          className="share-button">
          <EmailIcon size={32} />
        </EmailShareButton>
        </div>
      </div>
    )
  }
}

export default SocialMedia
