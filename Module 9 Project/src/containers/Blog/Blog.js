import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: '',
        error: false
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
            this.setState({error: true});
        }
    }

    selectPost = (id) => {
        this.setState({selectedPostId: id});
    };

    render () {
        let postList = <p>Something went wrong!</p>
        if (!this.state.error) {
            postList = this.state.posts.map(post => {
                return <Post 
                            key={post.id + Math.random()} 
                            title={post.title} 
                            author={post.author} 
                            clicked={() => this.selectPost(post.id)}
                        />
            });
        }

        return (
            <div>
                <section className="Posts">
                    {postList}
                </section>
                <section>
                    <FullPost postId={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;