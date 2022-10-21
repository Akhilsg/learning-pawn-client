import React from 'react'
import { Typography } from '@material-ui/core';

const CommentView = ({ post }) => {
  return (
    <div>
      <Typography>{post?.comment}</Typography>
      <br />
    </div>
  )
}

export default CommentView;