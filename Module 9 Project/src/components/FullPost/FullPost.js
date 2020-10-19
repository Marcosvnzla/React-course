import React, { Component } from 'react';
import axios from 'axios';


import './FullPost.css';

class FullPost extends Component {
    state = {
        selectedPost: null
    }

    async componentDidUpdate () {
        if (this.props.postId) {
            if (!this.state.selectedPost || (this.state.selectedPost && (this.state.selectedPost.id !== this.props.postId))) {
                const response = await axios.get(`/posts/${this.props.postId}`);
                this.setState({selectedPost: response.data});
            }
        }
    }

    async deletePost () {
        const response = await axios.delete(`/posts/${this.props.postId}`);
        console.log(response);
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;

        if(this.props.postId) {
            post = <p style={{textAlign: 'center'}}>Loading...</p>;
        }

        if (this.state.selectedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.selectedPost.title}</h1>
                    <p>{this.state.selectedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePost.bind(this)} className="Delete">Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;