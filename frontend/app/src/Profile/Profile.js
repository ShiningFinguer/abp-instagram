// InstagramProfile.jsx
import React, { useState } from 'react';
import { Grid, User } from 'lucide-react';
import '../CSS/Profile.css';
import InfoProfile from './InfoProfile';
import TabsProfile from './TabsProfile';

const InstagramProfile = ({ user }) => {

  return (
    <div className="profile-container">
        <InfoProfile/>  
        <TabsProfile/>
    </div>
    

      
  );
}


export default InstagramProfile;