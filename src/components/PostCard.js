import React from 'react'

const PostCard = ({ post }) => {

    const { postId, title, date, excerpt } = post.node;

    return (
        <div className="post-card">
            <a href={`https://heavybear.net/post/${postId}`} target="_blank" rel="noopener noreferrer">
                <p className="title">{title}</p>
                <p className="date">{new Date(date).toDateString()}</p>
                <p className="summary" dangerouslySetInnerHTML={{ __html: excerpt }}></p>
            </a>
        </div >
    )
}

export default PostCard;
