import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    minWidth: '300px',
    maxWidth: '650px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '0',
      minHeight: '100'
    },
  },
  paper: {
    padding: theme.spacing(2),
    width: 'auto'
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0',
    },
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  postDetails: {
    padding: '20px',
    marginRight: '20px',
    borderRadius: '15px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0',
      marginTop: '20px'
    }
  },
  loadingPaper: {
    display: 'flex',
    marginLeft: '20px',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
  commentsOuterContainer: {
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '15px',
      width: '61vw'
    },
  },
  divider: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      marginBottom: '15px',
    }
  },
}));
