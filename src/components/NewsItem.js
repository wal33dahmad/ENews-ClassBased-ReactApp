import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
      let {title, description, imgurl, newsUrl, author, publishedAt, source} = this.props
    return (
        <div className="card h-100">
            <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-dark">{source}</span>
            <img src={imgurl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title.length>20?`${title.slice(0,20)}...`:title}</h5>
                <p className="card-text">{description.length>70?`${description.slice(0,70)}...`:description}</p>
                <p className="card-text"><small className="text-muted">By {author?author:'unknown'} on {new Date(publishedAt).toDateString()}</small></p>
                <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
    )
  }
}

export default NewsItem