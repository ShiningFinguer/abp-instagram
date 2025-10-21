// InstagramProfile.jsx
import React, { useState } from 'react';
import { Grid, User } from 'lucide-react';
import '../CSS/Profile.css';

const InfoProfile = () => {

    return (
    <div>
        {/* Profile Header */}
        <div className="profile-header">
            <div className="profile-content">
            {/* Profile Picture */}
            <div className="profile-picture-wrapper">
                <div className="profile-picture-gradient">
                <div className="profile-picture-border">
                    <div className="profile-picture">
                    <img 
                        src="" 
                        alt="Profile" 
                        className="profile-image"
                    />
                    </div>
                </div>
                </div>
            </div>

            {/* Profile Info */}
            <div className="profile-info">
                <div className="profile-top">
                <h1 className="username">rhiaaan.estante</h1>
                <button className="edit-button">
                    Edit profile
                </button>
                </div>

                {/* Stats */}
                <div className="profile-stats">
                <div className="stat">
                    <span className="stat-number">0</span> posts
                </div>
                <div className="stat">
                    <span className="stat-number">155</span> followers
                </div>
                <div className="stat">
                    <span className="stat-number">300</span> following
                </div>
                </div>

                {/* Bio */}
                <div className="profile-bio">
                <div className="bio-name">Rhian</div>
                <div className="bio-pronouns">she/her</div>
                <div className="bio-flag">🇵🇭</div>
                </div>
            </div>
            </div>
        </div>
    </div>
    )
}


export default InfoProfile;