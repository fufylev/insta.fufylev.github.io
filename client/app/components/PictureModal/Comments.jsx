import React, { useEffect, useState } from 'react';
import CommentPostForm from './CommentPostForm.jsx';
import { addPost } from '~/libs/api/API_comments';
import { getUserAvatar } from '~/libs/api/API_user';
import { generateID } from '~/libs/api/API';

function Comments(props) {
    const sortedComments = props.comments.sort((a, b) => b.timestamp - a.timestamp);
    const [comments, setComments] = useState(sortedComments);
    const { goToUser, picID, user } = props;
    const numberOfComments = comments.length;

    const postHandler = (post) => {
        const newPost = {
            id: generateID(),
            text: post,
            timestamp: new Date(),
            user: { avatar: user.avatar.thumbnail, uid: user.uid, username: user.username },
        };
        // use optimistic update
        setComments([newPost, ...comments]);

        // add post to Cloud FireSore DB
        addPost(newPost, picID).then(res => {
            if (res === false) {
                alert('Something wrong occurred - try again later');

                // return previous state
                const prevCommentsArrayState = comments.filter(comment => comment.timestamp !== newPost.timestamp);
                setComments(prevCommentsArrayState);
            }
        });
    };

    return (
        <>
            <div className='picture-card-comments'>
                {numberOfComments > 0 && comments.map((comment, index) => {
                    return (
                        <div key={index} className='picture-card-comments-container'>
                            {comment.user.avatar && <img 
                                src={comment.user.avatar}
                                alt="avatar"
                                className='picture-card-user-avatar'
                            />}
                            <div>
                                <span
                                    onClick={() => goToUser(comment.user.uid)}
                                    className='picture-card-user_link'>
                                    {comment.user.username}
                                </span>
                                <span>{comment.text}</span> 
                            </div>
                            
                        </div>
                    );
                })}
            </div>
            <CommentPostForm onPost={postHandler}/>
        </>

    );
}

export default Comments;