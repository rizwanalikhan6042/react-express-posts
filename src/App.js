import './App.css';
// import './tailwind.css'; 
import Login from './components/Login';
import Registration from './components/Registration';
import PostList from './components/PostList';
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import { useState } from "react";


function App() {
  const [currentUser, setCurrentUser] = useState({});
  return (
    <div className="App">
        <Router>
        <Routes>
          <Route
            path="/"
            element={currentUser && currentUser._id  ? (
                <PostList
                  setCurrentUser={setCurrentUser}
                  username={currentUser.fname}
                />
              ) : (
                <Login setCurrentUser={setCurrentUser} />
              )
            }
          ></Route>
        
          <Route
            path="/login"
            element={<Login setCurrentUser={setCurrentUser} />}
          />
          <Route path="/signup" element={<Registration />}/>
          <Route path="/posts" element={<PostList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
