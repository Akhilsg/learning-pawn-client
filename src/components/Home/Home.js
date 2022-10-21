import React, { useState } from 'react';
import { Container, Grow, Grid, AppBar, Paper, Fab } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Pagination from '../Pagination';
import useStyles from './styles';
import Controls from '../../controls/Controls';
import Box from '@material-ui/core/Box';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

const fabStyleInv = {
  position: 'absolute',
  display: 'none'
};

const Home = ({ setCurrentId }) => {
  const classes = useStyles();
  const { isLoading } = useSelector((state) => state.posts);
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('profile'));

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(`/posts/search?searchQuery=${search}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <>
      <Grow in>
        <Container maxWidth="xl">
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
            className={classes.gridContainer}
          >
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar
                className={classes.appBarSearch}
                position="static"
                color="inherit"
              >
                <Controls.Input
                  onKeyDown={handleKeyPress}
                  name="search"
                  label="Search tournaments"
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <ChipInput
                  style={{ margin: '10px 0' }}
                  value={tags}
                  onAdd={(chip) => handleAddChip(chip)}
                  onDelete={(chip) => handleDeleteChip(chip)}
                  label="Search Tags"
                  variant="outlined"
                />
                <Controls.Button
                  onClick={searchPost}
                  variant="contained"
                  color="primary"
                  text="Search"
                />
              </AppBar>
              {(!searchQuery && !tags.length) && (
                <Paper className={classes.pagination} elevation={6}>
                  <Pagination page={page} />
                </Paper>
              )}
              <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab
                  color="primary"
                  disabled={!user?.result?.name}
                  style={isLoading ? fabStyleInv : fabStyle}
                  component={Link}
                  to='/create'
                >
                  <AddIcon />
                </Fab>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
};

export default Home;
