import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	card: {
		width: "50%	",
		borderRadius: '6px',
		margin: "auto",
		[theme.breakpoints.down('sm')]: {
			width: "100%"
		}
	},
	link: {
    textDecoration: 'none',
  },
}));
