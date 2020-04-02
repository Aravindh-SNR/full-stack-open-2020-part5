import React, { useState, useEffect, useRef } from 'react';
import Blog from './Blog';
import blogService from '../services/blogs';
import BlogForm from './BlogForm';
import Togglable from './Togglable';
import PropTypes from 'prop-types';

const Blogs = ({ user, setUser, setMessage, setType }) => {
    const [blogs, setBlogs] = useState([]);
    const blogFormRef = useRef();

    useEffect(() => {
        blogService.getAll().then(setBlogs);
    }, []);

    const hideBlogForm = () => {
        blogFormRef.current.toggleVisibility();
    };

    const updateLikes = async blog => {
        try {
            const updatedBlog = await blogService.update(blog.id, { likes: blog.likes + 1 });
            setBlogs(blogs.map(item => item.id === blog.id ? updatedBlog : item));
        } catch (exception) {
            setMessage(exception.response.data.error);
            setType('error');
        }
    };

    const removeBlog = async blog => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            try {
                const status = await blogService.remove(blog.id, user.token);
                if (status === 204) {
                    setBlogs(blogs.filter(item => item.id !== blog.id));
                    setMessage(`Blog ${blog.title} by ${blog.author} removed`);
                    setType('info');
                }
            } catch (exception) {
                setMessage(exception.response.data.error);
                setType('error');
            }
        }
    };

    const logOut = () => {
        setUser(null);
        localStorage.clear();
    };

    return (
        <div>
            <h2>Blogs</h2>

            <p>
                {user.name} logged in <button id='logout-btn' onClick={logOut}>Log out</button>
            </p>

            <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
                <BlogForm setBlogs={setBlogs} token={user.token} setMessage={setMessage} setType={setType}
                    hideBlogForm={hideBlogForm}
                />
            </Togglable>

            <div id='blogs'>
                {
                    []
                        .concat(blogs)
                        .sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)
                        .map(blog => <Blog key={blog.id} blog={blog} username={user.username}
                            updateLikes={updateLikes} removeBlog={removeBlog} />)
                }
            </div>
        </div>
    );
};

Blogs.propTypes = {
    user: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
    setType: PropTypes.func.isRequired
};

export default Blogs;