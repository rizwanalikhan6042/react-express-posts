// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import Post from './Post';
// // import InfiniteScroll from "react-infinite-scroll-component"; // Install this library using npm or yarn

// // const PostList = () => {
// //   const [posts, setPosts] = useState([]);
// //   const [hasMore, setHasMore] = useState(true);
// //   const [page, setPage] = useState(1);

// //   useEffect(() => {
// //     fetchPosts();
// //   }, []);

// //   const fetchPosts = () => {
// //     fetch(`http://localhost:3200/posts?page=${page}&limit=10`)
// //       .then(response => {
// //         if (!response.ok) {
// //           throw new Error('Network response was not ok');
// //         }
// //         return response.json();
// //       })
// //       .then(data => {
// //         if (data.length === 0) {
// //           setHasMore(false);
// //         } else {
// //           setPosts(prevPosts => [...prevPosts, ...data]);
// //           setPage(page + 1);
// //         }
// //       })
// //       .catch(error => {
// //         console.error("Error fetching posts:", error);
        
// //       });
// //   };
  
// //   return (
// //     <div className="container mx-auto">
// //       <h1 className="text-3xl font-bold text-center my-8">Posts</h1>
// //       <InfiniteScroll
// //         dataLength={posts.length}
// //         next={fetchPosts}
// //         hasMore={hasMore}
// //         loader={<h4>Loading...</h4>}
// //         endMessage={<p>No more posts to load</p>}
// //       >
// //         {posts.map(post => (
// //           <Post key={post.id} post={post} />
// //         ))}
// //       </InfiniteScroll>
// //     </div>
// //   );
// // };

// // export default PostList;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import InfiniteScroll from "react-infinite-scroll-component";
// import Post from "./Post"; // Assuming you have a Post component to render individual posts

// const PostList = () => {
//   const [posts, setPosts] = useState([]);
//   const [hasMore, setHasMore] = useState(true);
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const fetchPosts = () => {
//     axios.get(`http://localhost:3200/posts?page=${page}&limit=4`,{
//       headers: {                  // Authorization header with bearer token
//         authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
//     }
//     } )
//       .then(response => {
//         setPosts(prevPosts => [...prevPosts, ...response.data]);
//         setPage(page + 1);
//         if (response.data.length === 0) {
//           setHasMore(false);
//         }
//       })
//       .catch(error => {
//         console.error("Error fetching posts:", error);
//       });
//   };

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-3xl font-bold text-center my-8">Posts</h1>
//       <InfiniteScroll
//         dataLength={posts.length}
//         next={fetchPosts}
//         hasMore={hasMore}
//         loader={<h4>Loading...</h4>}
//         endMessage={<p>No more posts to load</p>}
//       >
//         {posts.map(post => (
//           <Post key={post.id} post={post} />
//         ))}
//       </InfiniteScroll>
//     </div>
//   );
// };

// export default PostList;
import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post"; // Assuming you have a Post component to render individual posts

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios.get(`http://localhost:3200/posts?page=${page}&limit=4`,{
      headers: {                  // Authorization header with bearer token
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
    } )
      .then(response => {
        setPosts(prevPosts => [...prevPosts, ...response.data]);
        setPage(page + 1);
        if (response.data.length === 0) {
          setHasMore(false);
        }
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
      });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">Posts</h1>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more posts to load</p>}
      >
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default PostList;