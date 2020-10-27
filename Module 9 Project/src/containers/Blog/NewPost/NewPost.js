import React, { Component } from 'react';
import axios from 'axios';
import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Juan Crisostomo Falcon'
    }

    async postData () {
        const data = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        };

        const response = await axios.post('/posts', data);
        console.log(response);
        this.props.history.replace('/');
    }

    render () {
        return (
            <div className="NewPost">
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="JCF">Juan Crisostomo Falcon</option>
                    <option value="Bolivar">Bolivar Tovar y Tovar</option>
                </select>
                <button onClick={this.postData.bind(this)} >Add Post</button>
            </div>
        );
    }
}

export default NewPost;