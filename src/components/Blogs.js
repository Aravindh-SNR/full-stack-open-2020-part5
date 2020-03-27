import React, { useState, useEffect } from 'react';
import Blog from './Blog';
import blogService from '../services/blogs';
import BlogForm from './BlogForm';

const Blogs = ({ user, setUser, setMessage, setType }) => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        blogService.getAll().then(setBlogs);
    }, []);

    const logOut = () => {
        setUser(null);
        localStorage.clear();
    };

    return (
        <div>
            <h2>Blogs</h2>

            <p>
                {user.name} logged in <button onClick={logOut}>Log out</button>
            </p>

            <BlogForm setBlogs={setBlogs} token={user.token} setMessage={setMessage} setType={setType} />

            <ul style={{padding: 0}}>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )}
            </ul>
        </div>
    );
};

export default Blogs;