import './ImageBox.scss';

import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FaComment, FaHeart } from 'react-icons/fa';

export default function ImageBox(props) {
    const { image, likes, comments, id } = props;
    const likesCount = likes.length;
    const commentsCount = comments.length;
    let { path, url } = useRouteMatch();
    return (
        <Link to={`${url}/${id}`}>
            <div className="gallery-item" tabIndex="0">
                <img src={image} className="gallery-image" alt=""/>
                <div className="gallery-item-info">
                    <ul>
                        <li className='gallery-item-likes'>
                            <span>
                                <span className="visually-hidden">Likes:</span>
                                <FaHeart size="1em" color='white'/> {likesCount}
                            </span>
                        </li>
                        <li>
                            <span>
                                <span className="visually-hidden">Comments:</span>
                                <FaComment size="1em" color='white'/> {commentsCount}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </Link>
    );
}