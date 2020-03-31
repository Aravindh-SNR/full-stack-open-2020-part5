import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Blog from '../components/Blog';
import { render, fireEvent } from '@testing-library/react';

describe('Blog component', () => {
    let component;
    const updateMockHandler = jest.fn();
    const removeMockHandler = jest.fn();

    beforeEach(() => {
        const blog = {
            likes: 10,
            title: 'What Are the React Team Principles?',
            author: 'Dan Abramov',
            url: 'https://overreacted.io/what-are-the-react-team-principles/',
            user: {
                username: 'gearon',
                name: 'Dan Abramov',
                id: '5e7cf55141dbe512149d5db3'
            },
            id: '5e8094393963801b447b26d3'
        };

        component = render(
            <Blog blog={blog} username={blog.user.username}
                updateLikes={updateMockHandler} removeBlog={removeMockHandler}
            />
        );
    });

    test('renders title and author but not url and number of likes by default', () => {
        expect(component.container.querySelector('.blog-heading')).toBeDefined();
        expect(component.container.querySelector('.blog-details')).toBeNull();
    });

    test('renders url and number of likes when the view button is clicked', () => {
        fireEvent.click(component.container.querySelector('.toggle-btn'));
        expect(component.container.querySelector('.blog-details')).toBeDefined();
    });

    test('fires event handler received as props twice when like button is clicked twice', () => {
        fireEvent.click(component.container.querySelector('.toggle-btn'));
        const likeButton = component.container.querySelector('.like-btn');
        fireEvent.click(likeButton);
        fireEvent.click(likeButton);
        expect(updateMockHandler.mock.calls.length).toBe(2);
    });
});