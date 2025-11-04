import React, { useState } from "react";
import redlikeIcon from "../../../Assets/heartRed.png";
import whitelikeIcon from "../../../Assets/heartWhite.png";

const Like = ({isLiked, handleLike}) => {
    
    return(
        <span 
        onClick={(e) => {
          e.stopPropagation();
          handleLike();
        }}
      >
        {isLiked ? <img src={redlikeIcon} className="icon"/> : <img src={whitelikeIcon} className="icon"/>}
      </span>
    )
}

export default Like;