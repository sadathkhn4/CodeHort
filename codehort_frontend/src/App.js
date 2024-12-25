import logo from './logo.svg';
import './App.css';
import SignIn from './component/SignIn/SignIn.tsx';
import SignUp from './component/SignUp/SignUp.tsx';
import Homepage from './component/Homepage/Homepage.tsx';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthDetails.js';
import GroupsPage from './component/GroupsPage/GroupsPage.tsx';
import { useAuth } from './AuthDetails.js';
import ProtectedRoutes from './ProtectedRoutes.js'
import Group from './component/Group/Group.tsx';
import Challenges from './component/Challenges/Challenges.tsx';
import RequestsPage from './component/RequestsPage/RequestsPage.tsx';
import EditProfile from './component/EditProfile/EditProfile.tsx';

function App() {
  const currentUser = useAuth()
  return (
    <div>

      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path='/signup' element={<SignUp />} />
            <Route exact path='/signin' element={<SignIn />} />
            <Route path="/"

              element={
                <ProtectedRoutes>
                  <Homepage />
                </ProtectedRoutes>
              }
            ></Route>
            <Route path="/groups"

              element={
                <ProtectedRoutes>
                  <GroupsPage />
                </ProtectedRoutes>
              }
            ></Route>
            <Route
              path="/challenges/:groupId/:challengeId"
              element={
                <ProtectedRoutes>
                  <Challenges />
                </ProtectedRoutes>
              }
            ></Route>
            <Route
              path="/groups/:groupid"
              element={
                <ProtectedRoutes>
                  <Group />
                </ProtectedRoutes>
              }
            ></Route>
            <Route path="/home"
              element={
                <ProtectedRoutes>
                  <Homepage />
                </ProtectedRoutes>
              }
            ></Route>
            <Route path="/requests"
              element={
                <ProtectedRoutes>
                  <RequestsPage />
                </ProtectedRoutes>
              }
            ></Route>
            <Route path="/profile/:userEmailId"
              element={
                <ProtectedRoutes>
                  <EditProfile />
                </ProtectedRoutes>
              }
            ></Route>

          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App;
