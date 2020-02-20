import React, { useState } from 'react';

function CommentPostForm (props) {
    const [value, setValue] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        handlePost();
    };

    const handlePost = () => {
        props.onPost(value);
        setValue('');
    };

    const handleChange = (event) => {
        setValue(event.target.value)
    };

    return (
        <form className="picture-card-form" onSubmit={handleSubmit}>
            <textarea
                placeholder="Add a comment…"
                className="picture-card-add-comment"
                autoComplete="off" autoCorrect="off"
                value={value}
                name='post'
                maxLength='250'
                onChange={handleChange}
            />
            {value && <button
                className="picture-card-post"
                onClick={() => handlePost()}
                type="submit"
            >
                Post
            </button>}
        </form>
    );
}

export default CommentPostForm;