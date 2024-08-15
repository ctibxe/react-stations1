import React from 'react';
//ボタンとURLを紐づけるためのimport
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ThreadList from './ThreadList';
import MakeThread from "./MakeThread"
import PostDetails from "./PostDetails"

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<ThreadList />} />
          <Route path="/threads/new" element={<MakeThread />} />
          <Route path = "/threads/:threadId" element = {<PostDetails />}/>
          {/*予期せぬページへの対処*/}
          <Route path="*" element={<h1>Not Found page</h1>}/>
        </Routes>
      </Router>
    );
}

export default App;

