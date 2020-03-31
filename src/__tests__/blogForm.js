import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from '../components/BlogForm';
import { render, fireEvent } from '@testing-library/react';

test('Form in BlogForm component calls respective event handlers with right details', () => {
    const { container } = render(<BlogForm />);

    const titleInput = container.querySelector('#title');
    const authorInput = container.querySelector('#author');
    const urlInput = container.querySelector('#url');

    fireEvent.change(titleInput, {
        target: { value: 'Dummy title' }
    });

    fireEvent.change(authorInput, {
        target: { value: 'Dummy author' }
    });

    fireEvent.change(urlInput, {
        target: { value: 'Dummy url' }
    });

    expect(titleInput.value).toBe('Dummy title');
    expect(authorInput.value).toBe('Dummy author');
    expect(urlInput.value).toBe('Dummy url');
});