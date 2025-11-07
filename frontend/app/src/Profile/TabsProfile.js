import React, { useState } from 'react';
import { Grid, User } from 'lucide-react';

const TabsProfile = () => {
    const [activeTab, setActiveTab] = useState('posts');

    return (
        <div>
            <div className="tabs-container">
        <div className="tabs">
          <button
            onClick={() => setActiveTab('posts')}
            className={`tab ${activeTab === 'posts' ? 'tab-active' : ''}`}
          >
            <Grid size={18} />
            <span>POSTS</span>
          </button>
          <button
            onClick={() => setActiveTab('tagged')}
            className={`tab ${activeTab === 'tagged' ? 'tab-active' : ''}`}
          >
            <User size={18} />
            <span>TAGGED</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="content-area">
        {activeTab === 'posts' && (
          <div className="empty-state">
            <div className="empty-icon camera-icon">
              <div className="camera-inner">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
            </div>
            <h2 className="empty-title">Share Photos</h2>
            <p className="empty-description">When you share photos, they will appear on your profile.</p>
            <button className="share-button">
              Share your first photo
            </button>
          </div>
        )}

        {activeTab === 'tagged' && (
          <div className="empty-state">
            <div className="empty-icon">
              <User size={32} strokeWidth={1.5} />
            </div>
            <h2 className="empty-title">Photos of you</h2>
            <p className="empty-description">When people tag you in photos, they'll appear here.</p>
          </div>
        )}
      </div>
        </div>
    )
}


export default TabsProfile;