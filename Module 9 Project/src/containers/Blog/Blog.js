import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';

class Blog extends Component {
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/" exact activeStyle={{
                                color: '#fa923f',
                                textDecoration: 'underline'
                            }}>Home</NavLink></li>
                            <li><NavLink to="/new-post" exact activeStyle={{
                                color: '#fa923f',
                                textDecoration: 'underline'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Route path="/new-post" exact component={NewPost} />
                <Route path="/posts" component={Posts} />
                <Route path="/" exact component={Posts} />
            </div>
        );
    }
}

export default Blog;