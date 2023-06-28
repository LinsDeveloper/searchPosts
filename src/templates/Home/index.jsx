
import './styles.css';
import { Component } from 'react';
import { loadPosts } from '../../utilitarios/load-posts';
import { Posts } from '../../components/Posts'
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

class Home extends Component{
    state = {
      posts: [],
      allPosts: [],
      page: 0,
      postsPerPage: 30,
      searchValue: ''
    };

  

  componentDidMount(){

    this.loadsPost();

  }


  loadsPost = async () => {

    const {page, postsPerPage} = this.state
    
    const postsAndPhotos = await loadPosts();

    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos })


  }


  loadMorePosts = () => {
      const {
        page,
        postsPerPage,
        allPosts,
        posts
      } = this.state;

      const nextPage = page + postsPerPage;
      const nexPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
      posts.push(...nexPosts)

      this.setState({posts, page: nextPage});

  }


  handleChange = (e) => {
    const { value } = e.target;
    this.setState({searchValue: value});
  }


  render(){

    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;

    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? 
    posts.filter(post => {
      return post.title.toLowerCase().includes(
          searchValue.toLowerCase()
        );
    })
    : 
    posts;

    return (

      <section className="container">
        
        <TextInput
          searchValue={searchValue}
          handleChange={this.handleChange}
        />

        {filteredPosts.length > 0 && (
          <Posts 
            posts={filteredPosts} 
          />
        )}


      

        <div className="button-container">
        <Button
          text = "Load More Posts"
          onClick = {this.loadMorePosts}
          disabled = {noMorePosts}
        />
        </div>
      </section>
    );
  }
  
  }

  export default Home;


  
  /*
  
*/

