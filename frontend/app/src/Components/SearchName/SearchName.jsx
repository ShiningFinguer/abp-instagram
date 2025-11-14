import './SearchName.css'
import { useState, useEffect } from 'react'
import React from "react";
import { useNavigate } from 'react-router-dom'
import Profile from '../../pages/Profile/Profile';

export const SearchName = ( { user }) => {
    const navigate = useNavigate()
    const click =  () => {
        navigate('/' + user.username);
    }

    return (
        <div className="search"
            onClick={() => click()}
            style={{
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
        >{user.username}</div>
    );
}
