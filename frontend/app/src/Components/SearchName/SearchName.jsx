import './SearchName.css'
import { useState, useEffect } from 'react'
import React from "react";

export const SearchName = ( { user }) => {
    const click =  () => {
        
    }
    return (
        <div className="search"
        onClick={click}
            style={{
              cursor: 'pointer',
              transition: 'transform 0.2s',
        }}
        >{user.username}</div>
    );
}
