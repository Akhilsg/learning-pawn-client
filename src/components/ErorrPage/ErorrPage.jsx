//React
import { Link } from "react-router-dom"
import React from "react"

//Material-ui
import {
	Paper,
	Typography,
	Card,
	CardContent,
	CardHeader
} from "@material-ui/core"
import { Divider } from "@material-ui/core"
import useStyles from "./styles"

export default function ErrorPage() {
	const classes = useStyles()

	return (
		<Card component={Paper} className={classes.card}>
			<CardHeader title="404 error" />
			<Divider />
			<CardContent>
				<Typography variant="subtitle1">You might have accidently typed something wrong because there is nothing here. 	 If you meant to add a tournament,
					<Link className={classes.link} to="/"> click here!</Link>!
				</Typography>
			</CardContent>
		</Card>
	)
}