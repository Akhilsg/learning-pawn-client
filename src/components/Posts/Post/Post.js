import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom';

import { deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const EditTournament = () => {
    ;
    history.push(`/edit/${post._id}`);
    setCurrentId(post._id);
  }

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  const confirmDiolog = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePost(post._id))
        Toast.fire({
          icon: 'success',
          title: 'Deleted Succesffuly!'
        })
      };
    })
  };

  const openPost = (e) => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <Card
      className={classes.card}
      raised
      elevation={6}
    >
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia
          className={classes.media}
          image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        <div className={classes.details}>
          <Typography
            variant="body2"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {post.message.split(' ').splice(0, 20).join(' ')}...
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        {(user?.result?._id === post?.creator) && (
          <>
            <Button size="small" color="secondary" onClick={confirmDiolog}>
              <DeleteIcon fontSize="small" /> &nbsp; Delete
            </Button>
            <Button
              onClick={EditTournament}
              color='primary'
              size="small"
            >
              <EditIcon fontSize="small" /> &nbsp; Edit
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;