import React from 'react';

function Post({ post }) {
  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>Author: {post.author}</p>
      <p>Created At: {post.createdAt}</p>
    </div>
  );
}

export default Post;
