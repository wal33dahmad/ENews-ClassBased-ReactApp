import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 8,
        category: 'general',
      }
      static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
      }
      capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    constructor(props){
        super(props)
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - E-News`
    }

    async updatePage(){
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
    }
    async componentDidMount(){
        this.updatePage();
    }
 
    fetchMoreData = async () => {
        this.setState({page: this.state.page+1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        });
        }

  render() {
    return (
      <div className='container my-3'>
        <h2 className='mb-3 text-center'>E-News {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
        {this.state.loading && <Spinner/>}

        <InfiniteScroll
        dataLength={this.state.articles.length}
        next={this.fetchMoreData}
        hasMore={this.state.articles.length !== this.state.totalResults}
        loader={<Spinner/>}>
        
        <div className="container mt-3">
        
            <div className="row gy-3">
            {this.state.articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title?element.title:''} description={element.description?element.description:''} imgurl={element.urlToImage?element.urlToImage:'https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc='} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name}/>
            </div>
            })} 
            </div>
        </div>
        </InfiniteScroll>
          
      </div>
    )
  }
}

export default News