//React
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//material-ui
import {
	Card,
	CardHeader,
	Grid,
	Typography,
	CardContent,
	CircularProgress,
	Divider,
	Box,
	Fab
} from '@material-ui/core';
import useStyles from './styles'

//icons
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import AddIcon from '@mui/icons-material/Add'

//actions
import Post from '../Posts/Post/Post';
import { getPostsByCreator } from '../../actions/posts';
import Controls from '../../controls/Controls';
import PageHeader from './ProfileHeader';
import Popup from '../Popup/Popup';
import EditName from './Edit/EditName';
import EditEmail from './Edit/EditEmail';
import Swal from 'sweetalert2';

const Profile = ({ setCurrentId, navOpen, setNavOpen }) => {
	const user = JSON.parse(localStorage.getItem('profile'));
	const dispatch = useDispatch();
	const location = useLocation();
	const [openPopup, setOpenPopup] = useState(false);
	const [openPopupEmail, setOpenPopupEmail] = useState(false);
	const classes = useStyles()
	const { posts, isLoading } = useSelector((state) => state.posts);
	const currentUser = user?.result.name;

	const fabStyle = {
		position: 'absolute',
		bottom: 16,
		right: 16,
	};
	
	const fabStyleInv = {
		position: 'absolute',
		display: 'none'
	};

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
	})

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
				Toast.fire({
					icon: 'success',
					title: 'Deleted Succesffuly!'
				})
			}
		})
	}

	useEffect(() => {
		if (location.pathname === ('/profile')) {
			dispatch(getPostsByCreator(currentUser));
		}
	}, [location, dispatch, currentUser]);

	if (!user?.result.name) {
		return (
			<Card>
				<CardHeader title='Sign in' />
				<Divider />
				<CardContent>
					<Typography>Please sign in to view your profile!&nbsp;
						<Typography
							style={{ textDecoration: 'none', color: '#3f51b5' }}
							component={Link}
							to='/auth'
						>
							Click here
						</Typography> to sign in or create an account
					</Typography>
				</CardContent>
			</Card>
		)
	}

	return (
		<div>
			<Grid container spacing={4}>
				<Grid item className={classes.profileCard}>
					<Card>
						<PageHeader
							title='My profile'
							subTitle='Account'
							icon={<PeopleOutlineTwoToneIcon fontSize='large' />}
						/>
						<br />
						<Divider />
						<CardContent>
							<Typography style={{ fontSize: '20px' }}> <strong>Name: </strong> {user?.result.name} </Typography>
							<Typography style={{ fontSize: '20px' }}> <strong>Email: </strong> {user?.result.email} </Typography>
							<Typography style={{ fontSize: '20px' }}> <strong>Tournaments Created: </strong> {posts.length} </Typography>
						</CardContent>
					</Card>
					<br />
					<Card>
						<PageHeader
							title='Edit account'
							subTitle='Account'
							icon={<EditTwoToneIcon fontSize='large' />}
						/>
						<br />
						<Divider />
						<CardContent>
							<Typography
								style={{
									color: '#3f51b5',
									cursor: 'pointer',
									fontSize: '20px'
								}}
								onClick={() => {
									setOpenPopup(true);
								}}
							>
								Change name
							</Typography>
							<Typography
								style={{
									color: '#3f51b5',
									cursor: 'pointer',
									fontSize: '20px'
								}}
								onClick={() => {
									setOpenPopupEmail(true)
								}}
							>
								Change email
							</Typography>
							<Typography style={{ fontSize: '20px', cursor: 'pointer' }} onClick={confirmDiolog}>
								Delete account
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item lg={4} className={classes.profileCard}>
					<Card>
						<PageHeader
							title='Plan'
							subTitle='Current Plan'
							icon={<AssignmentTwoToneIcon fontSize='large' />}
						/>
						<br />
						<Divider />
						<CardContent>
							<Typography style={{ fontSize: '20px' }}>
								Current Plan: Learning Pawn <strong>Starter</strong>.
							</Typography>
							<br />
							<Typography
								component={Link}
								to='/pricing'
								style={{ textDecoration: 'none' }}
							>
								<Controls.Button
									text='Upgrade Now!'
									color='primary'
								/>
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Divider
					orientation='vertical'
					variant='middle'
					flexItem
					className={classes.verticalDivider}
				/>
				<Grid item lg={5}>
					{!posts.length && !isLoading ?
						<Grid item className={classes.profileCard}>
							<Card>
								<CardHeader title='No tournaments' />
								<Divider />
								<CardContent>
									<Typography>
										You have created no posts yet!&nbsp;
										<Typography
											style={{ textDecoration: 'none', color: '#3f51b5', cursor: 'pointer' }}
											component={Link}
											to='/posts'
										>
											Click here
										</Typography> to create one now.
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						: (
							<Grid item className={classes.tournamentCard}>
								<CardHeader title={
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
								}
								/>
								<CardContent>
									<Divider style={{ margin: '0 0 25px 0' }} />
									{isLoading ? <CircularProgress /> : (
										<Grid container alignItems='stretch' spacing={3}>
											{posts?.map((post) => (
												<Grid key={post._id} item>
													<Post post={post} setCurrentId={setCurrentId} />
												</Grid>
											))}
										</Grid>
									)}
								</CardContent>
							</Grid>
						)}
				</Grid>
			</Grid>
			<Popup
				title="Edit Name"
				outerChildren={
					<Controls.Button
						text="Dismiss"
						variant="outlined"
						onClick={() => setOpenPopup(false)}
					/>
				}
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<EditName setOpenPopup={setOpenPopup} />
			</Popup>
			<Popup
				title="Edit Email"
				outerChildren={
					<Controls.Button
						text="Dismiss"
						variant="outlined"
						onClick={() => setOpenPopupEmail(false)}
					/>
				}
				openPopup={openPopupEmail}
				setOpenPopup={setOpenPopupEmail}
			>
				<EditEmail setOpenPopup={setOpenPopupEmail} />
			</Popup>
		</div>
	)
}

export default Profile;