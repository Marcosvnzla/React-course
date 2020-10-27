import React, { Component } from 'react';
import axios from 'axios';


import './FullPost.css';

class FullPost extends Component {
    state = {
        selectedPost: null
    }

    componentDidMount () {
        this.sendData();
    }

    async deletePost () {
        const response = await axios.delete(`/posts/${this.props.match.params.id}`);
        console.log(response);
    }

    async sendData () {
        if (this.props.match.params.id) {
            if (!this.state.selectedPost || (this.state.selectedPost && (this.state.selectedPost.id !== +this.props.match.params.id))) {
                const response = await axios.get(`/posts/${this.props.match.params.id}`);
                this.setState({selectedPost: response.data});
            }
        }
    }

    componentDidUpdate () {
        this.sendData();
    }

    render () {
        let post = null;

        if(this.props.match.params.id) {
            post = <p style={{textAlign: 'center'}}><strong>Loading...</strong></p>;
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