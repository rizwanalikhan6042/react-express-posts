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
import Post from "./Post";
import { useNavigate } from 'react-router-dom'

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios.get(`http://localhost:3200/posts?page=${page}&limit=4`, {
      headers: {                  // Authorization header with bearer token
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
      //     In the below code , I tried to make posts cyclic so that when posts end it starts from post one again so it will be infinitely scrolling down nature 
      // But due to lack of time , I was unable to do it. 
      // Currently it is successfully fetching 4 posts and when it comes to down it fetch again 
      .then(response => {
        if (response.data.length == 0) {

          setPage(1);

          fetchPosts();
        }

        setPosts(prevPosts => [...prevPosts, ...response.data]);
        setPage(page + 1);


      })
      .catch(error => {
        console.error("Error fetching posts:", error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container mx-auto">
      <button
        // className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 mr-4 float-right"
        className="bg-transparent text-red text-lg font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 mr-4 float-right fixed top-0 right-0"
        type="button"
        onClick={handleLogout}
      >
        Logout
      </button>
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