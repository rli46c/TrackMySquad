import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
		makeStyles,
		CssBaseline,
		Toolbar,
		IconButton,
		Typography,
		Badge,
		Box,
		Grid,
		Container
} from '@material-ui/core';
import {Facebook,LinkedIn, Twitter} from '@material-ui/icons';

function Copyright() {
	return (
		<Typography variant='body2' align='center'>
			{'Copyright © '}
			<Link color='inherit' to='https://material-ui.com/'>
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const Footer = ({}) => {
	return (
		<Fragment>
			<div className='topfooter'>
				<Container>	
					<Grid item xs={12} md={12}>
						<Grid Container justify='center' spacing={2}>
							<Grid item md={9} className='fleft'>
								<div className='footermenu'>
									<IconButton
											aria-label='show 4 new mails'
											color='inherit'
										  >
											<Badge badgeContent={null} color='secondary'>
											  <span>Support</span>
											</Badge>
									</IconButton>
									<IconButton
											aria-label='show 4 new mails'
											color='inherit'
										  >
											<Badge badgeContent={null} color='secondary'>
											  <span>Blog</span>
											</Badge>
									</IconButton>
									<IconButton
											aria-label='show 4 new mails'
											color='inherit'
										  >
											<Badge badgeContent={null} color='secondary'>
											  <span>About us</span>
											</Badge>
									</IconButton>
									<IconButton
											aria-label='show 4 new mails'
											color='inherit'
										  >
											<Badge badgeContent={null} color='secondary'>
											  <span>Contact</span>
											</Badge>
									</IconButton>
									<IconButton
											aria-label='show 4 new mails'
											color='inherit'
										  >
											<Badge badgeContent={null} color='secondary'>
											  <span>Affiliate program</span>
											</Badge>
									</IconButton>
									<IconButton
											aria-label='show 4 new mails'
											color='inherit'
										  >
											<Badge badgeContent={null} color='secondary'>
											  <span>Terms</span>
											</Badge>
									</IconButton>
									<IconButton
											aria-label='show 4 new mails'
											color='inherit'
										  >
											<Badge badgeContent={null} color='secondary'>
											  <span>Privacy</span>
											</Badge>
									</IconButton>
								</div>
								<ul>
									<li className='facebook'><Facebook /></li>
									<li className='twitter'><Twitter /></li>
									<li className='linkedin'><LinkedIn /></li>
								</ul>
							</Grid>
							<Grid item md={3} className='rleft'>
								<div className='footerright'>
									<p>18-23 Greenwood Dr Fair Lawn, NJ 07410</p>
								</div>
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</div>
			<div className='bottomfooter'>
				<Container >
					<Grid item xs={12} md={12}>
						<Grid Container justify='center' spacing={2}>
							<Box mt={5}>
								<Copyright />
							</Box>
						</Grid>	
					</Grid>		
				</Container>
			</div>
		</Fragment>
	);
};
  
Footer.propTypes = {
		
}

const mapStateToProps = state => ({});
const mapDispatchToProps = {};
export default connect (mapStateToProps, mapDispatchToProps)(Footer); 
