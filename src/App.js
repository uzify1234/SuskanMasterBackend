import logo from './logo.svg';
import './App.css';
import Leftmenu from './components/Leftmenu';
import Users from './components/Users';
import Particularuser from './components/Particularuser';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Monthlyreviews from './components/Monthlyreviews';
import Mutualfundspick from './components/Mutualfundspick';
import Uploadusers from './components/Uploadusers';
import Fundamentaldata from './components/Fundamentaldata';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" caseSensitive={false} element={
        <div className='holder'>
          <Login />
        </div>
        } />
        <Route path="/volatilitydashboardbackend" caseSensitive={false} element={
        <div className='holder'>
          <Login />
        </div>
        } />
        <Route path="/users" caseSensitive={false} element={
        <div className='holder'>
          <Leftmenu />
          <Users />
        </div>
        } />
        <Route path="/user/:uid" caseSensitive={false} element={
        <div className='holder'>
          <Leftmenu />
          <Particularuser />
        </div>
        } />
        <Route path="/monthlyreviews" caseSensitive={false} element={
        <div className='holder'>
          <Leftmenu />
          <Monthlyreviews />
        </div>
        } />
        <Route path="/mutualfundspick" caseSensitive={false} element={
        <div className='holder'>
          <Leftmenu />
          <Mutualfundspick />
        </div>
        } />
        <Route path="/uploadusers" caseSensitive={false} element={
        <div className='holder'>
          <Leftmenu />
          <Uploadusers />
        </div>
        } />
        <Route path="/fundamentaldata" caseSensitive={false} element={
        <div className='holder'>
          <Leftmenu />
          <Fundamentaldata />
        </div>
        } />
 
      </Routes>
    </Router>
    </div>
  );
}

export default App;
