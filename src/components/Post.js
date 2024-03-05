import React from 'react';

function Post({ post }) {
  return (
    <div className="post bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">{post.title}</h2>
      <p className="text-gray-700 mb-4">{post.content}</p>
      <div className="flex justify-between items-center">
        <p className="text-gray-600">Author: {post.author}</p>
        <p className="text-gray-600">Created At: {post.createdAt}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-600">View Count: {post.viewCount}</p>
        <p className="text-gray-600">Category: {post.category}</p>
      </div>
    </div>
  );
}

export default Post;
