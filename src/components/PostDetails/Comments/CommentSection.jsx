//React
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

//Material-ui
import {
  Typography,
  Divider,
  CardContent,
  Paper
} from '@material-ui/core';
import useStyles from '../styles';
import { EditTwoTone, DeleteTwoTone } from '@material-ui/icons';

//Actions
import { commentPost } from '../../../actions/posts';
import Controls from '../../../controls/Controls';
import Popup from '../../Popup/Popup';
import { useSelector } from 'react-redux'
import CommentView from './CommentView'

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const { isLoading } = useSelector((state) => state.posts);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const [openPopupComment, setOpenPopupComment] = useState(false)
  const [comments, setComments] = useState(post?.comments);
  const classes = useStyles();
  const commentsRef = useRef();

  //Create a comment
  const handleComment = async () => {
    const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));

    setComment('');
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  //Check if user is signed in or not
  if (!user?.result?.name) {
    return (
      <Paper elevation={6} style={{ borderRadius: '15px', padding: '20px' }}>
        <Typography variant="h6">
          Please Sign In to view and create comments.
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      <Paper
        style={{
          padding: '20px',
          borderRadius: '15px'
        }}
        elevation={6}
      >
        <CardContent>
          <Typography gutterBottom variant="h6">Write a comment</Typography>
          <Controls.TextArea
            fullWidth
            variant="outlined"
            label="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />
          <Controls.Button
            style={{ marginTop: '10px' }}
            fullWidth
            disabled={!comment.length}
            text="Submit"
            onClick={handleComment}
          />
          <Divider style={{ margin: '20px 0 20px 0' }} />
          <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
              {!comments.length && !isLoading ?
                <Typography>There are no comments! Create a comment up top ^</Typography>
                : (
                  <span>
                    {comments?.map((c, i) => (
                      <Typography
                        key={i}
                        gutterBottom
                        variant="subtitle1"
                        style={{ display: 'flex' }}
                      >
                        <strong>{c.split(': ')[0]} &nbsp; </strong>
                        <Typography
                          onClick={() => {
                            setOpenPopupComment(true)
                          }}
                          varaint='body1'
                          component='p'
                        >
                          {c.split(':')[1]}
                        </Typography>
                      </Typography>
                    ))}
                  </span>
                )
              }
              <div ref={commentsRef} />
            </div>
            <Divider className={classes.divider} />
          </div>
        </CardContent>
      </Paper>
      <Popup
        title={` ${user?.result?.name}'s comment `}
        outerChildren={
          <div style={{ display: 'flex' }}>
            <Controls.ActionButton>
              <DeleteTwoTone color='secondary' />
            </Controls.ActionButton>
            <Controls.ActionButton size='small'>
              <EditTwoTone color='primary' />
            </Controls.ActionButton>
          </div>
        }
        openPopup={openPopupComment}
        setOpenPopup={setOpenPopupComment}
      >
        <CommentView setOpenPopup={setOpenPopupComment} />
      </Popup>
    </>
  );
};

export default CommentSection;
