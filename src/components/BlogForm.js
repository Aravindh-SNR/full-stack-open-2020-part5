import React, { useState } from 'react';
import blogService from '../services/blogs';
import PropTypes from 'prop-types';

const BlogForm = ({ setBlogs, token, setMessage, setType, hideBlogForm }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const createBlog = async event => {
        event.preventDefault();

        try {
            const blog = await blogService.create({ title, author, url }, token);
            setBlogs(blogs => blogs.concat(blog));
            setMessage(`A new blog ${title} by ${author} added`);
            setType('info');
            setTitle('');
            setAuthor('');
            setUrl('');
            hideBlogForm();
        } catch (exception) {
            setMessage(exception.response.data.error);
            setType('error');
        }
    };

    return (
        <div>
            <h2>Create new blog</h2>

            <form onSubmit={createBlog}>
                <div className='form-field'>
                    <label htmlFor='title'>Title: </label>
                    <input id='title' value={title} onChange={({ target }) => setTitle(target.value)}
                        autoComplete='off' required />
                </div>

                <div className='form-field'>
                    <label htmlFor='author'>Author: </label>
                    <input id='author' value={author} onChange={({ target }) => setAuthor(target.value)}
                        autoComplete='off' required />
                </div>

                <div className='form-field'>
                    <label htmlFor='url'>URL: </label>
                    <input id='url' value={url} onChange={({ target }) => setUrl(target.value)}
                        autoComplete='off' required />
                </div>

                <div>
                    <button type='submit'>Create</button>
                </div>
            </form>
        </div>
    );
};

BlogForm.propTypes = {
    setBlogs: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    setMessage: PropTypes.func.isRequired,
    setType: PropTypes.func.isRequired,
    hideBlogForm: PropTypes.func.isRequired
};

export default BlogForm;