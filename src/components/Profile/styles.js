import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	profileCard: {
		marginRight: '10px',
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			marginBottom: '10px',
		}
	},
	noPosts: {
		marginLeft: '10px',
		[theme.breakpoints.down('sm')]: {
			marginLeft: 'none',
			marginBottom: '10px',
		}
	},
	tournamentCard: {
		justifyContent: 'center',
		alignContent: "center",
		[theme.breakpoints.down('sm')]: {
			margin: 'auto',
			width: '100%',
			justifyContent: 'center'
		},
	},
	[theme.breakpoints.down('md')]: {
		verticalDivider: {
			visibility: 'hidden',
		}
	},
	pageHeader: {
		paddingLeft: theme.spacing(2),
		paddingTop: theme.spacing(2),
		display: 'flex',
	},
	pageTitle: {
		paddingLeft: theme.spacing(2),
		"& .MuiTypography-subtitle2": {
			opacity: "0.6"
		}
	},
	pageIcon: {
		display: 'inline-block',
		padding: theme.spacing(2),
		color: '#3c44b1'
	},
	sideBar: {
    height: '100% !important',
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid',
    borderRadius: '0',
    borderColor: 'rgba(64, 194, 133, 0.693)',
    backgroundColor: 'rgb(255, 255, 255)',
    transition:' 0.8s ease',
  },
  toggleMenu: {
    height: '50px',
    borderTopRightRadius: '10rem',
    borderBottomRightRadius: '9rem',
    width: '10px',
    position: 'absolute',
    outline: 'none',
    zIndex: '1',
    backgroundColor: 'rgba(64, 194, 133, 0.693)',
    borderColor: 'rgba(64, 194, 133, 0.693)',
    borderLeft: '0',
  }
}));
