
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	name: {
		width: '100%',
		[theme.breakpoints.down('sm')]: {
			width: 'auto'
		}
	},
	noPosts: {
		width: '50%',
		margin: 'auto',
		[theme.breakpoints.down('sm')]: {
			width: '100%'
		}
	}
}));
