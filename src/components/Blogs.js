import React, { useState, useEffect, useRef } from 'react';
import Blog from './Blog';
import blogService from '../services/blogs';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

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
                        .map(blog => <Blog key={blog.id} blog={blog} updateLikes={updateLikes} />)
                }
            </div>
        </div>
    );
};

export default Blogs;