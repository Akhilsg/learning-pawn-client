//React
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//Material-ui
import {
  Paper,
  Typography,
  CircularProgress,
  Grid
} from '@material-ui/core/';
import useStyles from './styles';

//Time
import moment from 'moment';

//Actions
import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './Comments/CommentSection';

const Post = () => {
  const { post, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();

  //Getting the post
  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  //Getting the post by search, if searched
  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post, dispatch]);

  //If there is no post, return nothing
  if (!post) return null;

  //Loading progess cirle
  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (
    <Grid container alignItems="stretch">
      <Grid item lg={9}>
        <Paper className={classes.postDetails} elevation={6}>
          <div className={classes.card}>
            <div className={classes.section}>
              <Typography variant="h3" component="h2">{post.title}</Typography>
              <Typography
                gutterBottom
                variant="h6"
                color="textSecondary"
                component="h2"
              >
                {post.tags.map((tag) => (
                  <Link
                    to={`/tags/${tag}`}
                    style={{ textDecoration: 'none', color: '#3f51b5' }}
                    key="tag"
                  >
                    {` #${tag} `}
                  </Link>
                ))}
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                component="p"
              >
                {post.message}
              </Typography>
              <Typography>
                Creator:
                <Link
                  to={`/creators/${post.name}`}
                  style={{ textDecoration: 'none', color: '#3f51b5' }}
                >
                  {` ${post.name}`}
                </Link>
              </Typography>
              <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.imageSection}>
              <img
                className={classes.media}
                src={
                  post.selectedFile ||
                  'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
                }
                alt={post.title} />
            </div>
          </div>
        </Paper>
      </Grid>
      <Grid item lg={3}>
        <CommentSection post={post} />
      </Grid>
    </Grid>
  );
};

export default Post;
