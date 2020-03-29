import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, username, updateLikes, removeBlog }) => {
    const [visibility, setVisibility] = useState(false);

    const toggleVisibility = () => {
        setVisibility(!visibility);
    };

    const blogStyle = {
        padding: 10,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    };

    return (
        <div style={blogStyle}>
            {blog.title} | {blog.author} &nbsp;
            <button onClick={toggleVisibility}>{visibility ? 'Hide' : 'View'}</button>
            {
                visibility &&
                <div>
                    <p>
                      Link: <a href={blog.url} target='_blank' rel='noopener noreferrer'>{blog.url}</a>
                    </p>

                    <p>
                      Likes: {blog.likes} <button onClick={() => updateLikes(blog)}>Like</button>
                    </p>

                    <p>
                      Added by: {blog.user.name}
                    </p>

                    {
                        blog.user.username === username &&
                        <button onClick={() => removeBlog(blog)}>Remove</button>
                    }
                </div>
            }
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired,
    updateLikes: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired
};

export default Blog;