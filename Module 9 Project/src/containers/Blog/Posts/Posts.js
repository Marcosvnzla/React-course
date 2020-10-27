import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
  state = {
      posts: []
  }

  async componentDidMount () {
      try {
          const serverResponse = await axios.get('/posts');
          const posts = serverResponse.data.slice(0, 4);
          const authors = ['Tovar', 'Juan', 'Crisostomo', 'Falcon'];
          const updatedPosts = posts.map((post, index) => {
              return {
                  ...post,
                  author: authors[index]
              }
          });
      this.setState({posts: updatedPosts});
          
      } catch (e) {
        console.log(e);
          //this.setState({error: true});
      }
  }

  selectPost = (id) => {
    this.props.history.push({pathname: '/posts/' + id });
  };

  render () {
    let postList = <p>Something went wrong!</p>
    if (!this.state.error) {
        postList = this.state.posts.map(post => {
            return (
                <Post 
                    key={post.id + Math.random()}
                    title={post.title} 
                    author={post.author} 
                    clicked={() => this.selectPost(post.id)}
                />
            );
        });
    }

    return (
      <div>
        <section className="Posts">
            {postList}
        </section>
        <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
      </div>
    );
  }
}

export default Posts;