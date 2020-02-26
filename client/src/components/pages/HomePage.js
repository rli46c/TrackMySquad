import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	makeStyles,
	CssBaseline,
	Grid,
	Paper,
	Container
} from '@material-ui/core';
import { ArchiveRounded } from '@material-ui/icons';
import GroupIcon from '@material-ui/icons/Group';
import BackupIcon from '@material-ui/icons/Backup';
import SettingsIcon from '@material-ui/icons/Settings';
import Appbar from '../layout/Appbar';
import bgImage from '../../stock/img/site_bg.png';
import Userclipart from '../../stock/img/clipart-maleuser.png';
import Smapp from '../../stock/img/sm-app.png';
import Smshot from '../../stock/img/sm-shot.png';
import Smtime from '../../stock/img/sm-time.png';
import Comapnylogo from '../../stock/img/companylogo.png';
import Tracktime from '../../stock/img/tracktime.png';
import Timescreen from '../../stock/img/timescreen.png';
import Report from '../../stock/img/reports.png';

const useStyles = makeStyles(theme => ({
	root: {
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3)
	},
	bgbanner: {
		backgroundImage: `url(${bgImage})`,
		position: 'relative',
		top: '0px',
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	},
	paper: {
		height: 140
	},
	sectiontwo: {},
	blockheading: {
		textAlign: 'center',
		color: '#fff',
		fontWeight: '200',
		fontSize: '36px',
		marginBottom: '8px'
	},
	textcenter: {
		textAlign: 'center'
	},
	blockcontent: {
		color: '#fff',
		fontSize: '22px',
		fontWeight: '200',
		textAlign: 'center',
		marginTop: '0px'
	},
	hrline: {
		width: '750px',
		height: '1px',
		border: 'unset',
		background: 'rgba(255,255,255,0.1)'
	},
	smtrack: {},
	smtrackimg: {
		width: '400px'
	},
	smtrackinfoh2: {},
	smtrackinfop: {},
	gridcenter: {
		margin: '50px auto 0',
		textAlign: 'center'
	},
	screentrack: {
		margin: '50px 0'
	},
	fullquote: {
		paddingTop: '30px',
		paddingBottom: '30px'
	}
}));

const HomePage = ({}) => {
	const classes = useStyles();
	return (
		<Fragment>
			<CssBaseline />
			<Appbar />
			<div className={classes.bgbanner}>
				<Container component='main' className={classes.root}>
					<Grid container spacing={5} alignItems='flex-end'>
						<Grid item xs={12} md={12}>
							<Grid container justify='center' spacing={2}>
								<Grid item md={8}>
									<h1>
										<b>Keep Watching Your Team!</b>
									</h1>
								</Grid>
								<Grid item md={4}>
									<img src={Userclipart} alt={Userclipart} />
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</div>
			<div className={classes.sectiontwo}>
				<Container>
					<h2 className={classes.blockheading}>
						Track employees’<b>time</b> and <b>screenshots</b>. See it on the
						web.
					</h2>
					<p className={classes.blockcontent}>
						Get a clear picture of time and money your remote or office team
						spends on each task.
					</p>
					<hr className={classes.hrline}></hr>
					<Grid item xs={12} md={12} className={classes.gridcenter}>
						<Grid container justify='center' spacing={2}>
							<Grid item md={4}>
								<div className={classes.smtrack}>
									<div className='trackblock animated infinite bounce fast'>
										<img
											src={Smapp}
											alt={Smapp}
											className={classes.smtrackimg}
										/>
									</div>
									<div className='trackinfo'>
										<h2>Track effortlessly</h2>
										<p>with employee desktop application</p>
									</div>
								</div>
							</Grid>
							<Grid item md={4}>
								<div className={classes.smtrack}>
									<div className='trackblock animated infinite bounce fast'>
										<img src={Smshot} alt={Smshot} />
									</div>
									<div className='trackinfo'>
										<h2>See screenshots</h2>
										<p>and tracked time uploaded to the web</p>
									</div>
								</div>
							</Grid>
							<Grid item md={4}>
								<div className={classes.smtrack}>
									<div className='trackblock animated infinite bounce fast'>
										<img src={Smtime} alt={Smtime} />
									</div>
									<div className='trackinfo'>
										<h2>Get insights</h2>
										<p>with reports and timeline</p>
									</div>
								</div>
							</Grid>
						</Grid>
					</Grid>
					<div className='signuplink'>
						<Link to='/register' className='linkbtn'>
							Sign up for free!
						</Link>
						<br />
						<Link to='#' className='simplelink'>
							See plan & pricing
						</Link>
					</div>
					<div className={`${classes.textcenter} companyblock`}>
						<h2>
							Over <b>20000+</b> businesses already trusted us
						</h2>
						<div class='companylogo'>
							<img src={Comapnylogo} alt={Comapnylogo} />
						</div>
					</div>
					<div className={`${classes.textcenter} quotationline`}>
						<p className='quote'>
							<span>
								“We have employees working from 5 countries <br />
								and the app saves us a lot of time managing them.
								<br />I simply love ScreenshotMonitor!”
							</span>
						</p>
						<p className='quote-auth'>
							<i>-Milenko Pilic, HeySuccess.com</i>
						</p>
					</div>
					<Grid item xs={12} md={12} className={classes.screentrack}>
						<Grid container justify='center' spacing={2}>
							<Grid item md={6}>
								<div className='screenimg'>
									<img src={Tracktime} alt={Tracktime} />
								</div>
							</Grid>
							<Grid item md={6}>
								<div class='screeninfo'>
									<h2>Track time and tasks effortlessly</h2>
									<h3>
										<b>
											Your remote or office employees start and stop monitoring
											themselves using a lightweight desktop application.
										</b>
									</h3>
									<p>
										They create a task, and the program automatically tracks
										time and screenshots for this task. This information is then
										securely sent to screenshotmonitor.com for you to see in
										real time. No spying and your employees are in control!
									</p>
									<p>
										For more details see <Link to='#'>How it works.</Link>
									</p>
								</div>
							</Grid>
						</Grid>
					</Grid>
					<div className={`${classes.textcenter} quotationline`}>
						<p className='quote'>
							<span>
								“ScreenshotMonitor helps me manage <br />
								my team in different locations and allows them the
								<br />
								flexibility to work remotely.”
							</span>
						</p>
						<p className='quote-auth'>
							<i>-Efrat Gotlib, Therapy24x7</i>
						</p>
					</div>
					<Grid item xs={12} md={12} className={classes.screentrack}>
						<Grid container justify='center' spacing={2}>
							<Grid item md={6}>
								<div class='screeninfo'>
									<h2>See time and screenshots on the web</h2>
									<h3>
										<b>
											The tracked time, screenshots and task notes are all
											delivered to your dashboard.
										</b>
									</h3>
									<p>
										There is nothing for you (the manager) to install — you can
										see it online using your computer, tablet or a smartphone.
										You will know exactly when and what your employees have
										worked on, how much time and money they have spent on each
										task and what was on their monitors at that time. You will
										know for certain that you are paying for actual work, not
										for time spent on Facebook or shopping.
									</p>
									<p>
										For more details see <Link to='#'>How it works.</Link>
									</p>
								</div>
							</Grid>
							<Grid item md={6}>
								<div className='screenimg'>
									<img src={Timescreen} alt={Timescreen} />
								</div>
							</Grid>
						</Grid>
					</Grid>
					<div className={`${classes.textcenter} quotationline`}>
						<p className='quote'>
							<span>
								“ScreenshotMonitor allows us to look over completed <br />
								work by remote staff, shows when my staff is working and keeps
								<br />a backup of work produced. Highly recommend!”
							</span>
						</p>
						<p className='quote-auth'>
							<i>-Alex Dibben, Expect Best</i>
						</p>
					</div>
					<Grid item xs={12} md={12} className={classes.screentrack}>
						<Grid container justify='center' spacing={2}>
							<Grid item md={6}>
								<div className='screenimg'>
									<img src={Report} alt={Report} />
								</div>
							</Grid>
							<Grid item md={6}>
								<div class='screeninfo'>
									<h2>Get reports you need, at a glance</h2>
									<h3>
										<b>
											Get a clear picture of time and money your team spends on
											each task.
										</b>
									</h3>
									<p>
										Select specific employees, use date range shortcuts, see
										grouped by date or detailed time-sheets and download them in
										Excel for further analysis or to generate invoices. Your
										employees can also see the reports for their own time and
										use them to generate invoices if needed. All in a few
										clicks.
									</p>
									<p>
										For more details see <Link to='#'>How it works.</Link>
									</p>
								</div>
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</div>
			<div className='bgquote'>
				<Container className={classes.fullquote}>
					<div className={`${classes.textcenter} quotationline`}>
						<p className='quote'>
							<span>
								“ScreenshotMonitor is a simple, but powerful <br />
								tool you can start using in your business in 10 minutes.
								<br />
								Don’t know how we worked without it before!”
							</span>
						</p>
						<p className='quote-auth'>
							<i>-Ulf Kuhn, gananci.com</i>
						</p>
					</div>
				</Container>
			</div>
			<div className={`${classes.textcenter} bottom-track`}>
				<Container className={classes.fullquote}>
					<Grid item xs={12} md={12}>
						<Grid container justify='center' spacing={2}>
							<Grid item md={4}>
								<div class='trackbenefit'>
									<BackupIcon />
									<h2>Track without Internet</h2>
									<p>
										The app will continue time tracking and screenshot capture
										even with no connectivity to the web. The data will
										automatically be uploaded to the web next time there is an
										Internet connection. If an employee works without a computer
										– no problem either, he can add “offline time” without
										screenshots at any time.
									</p>
								</div>
							</Grid>
							<Grid item md={4}>
								<div class='trackbenefit'>
									<GroupIcon />
									<h2>Use for office employees</h2>
									<p>
										ScreenshotMonitor is a great monitoring software for both
										office employees and oursourced workers. An office employee
										can start the tracking: auto-start-stop features will take
										care of the rest. The program will stop automatically when a
										user is inactive (lunch or the end of the day) and will
										resume once a user is back.
									</p>
								</div>
							</Grid>
							<Grid item md={4}>
								<div class='trackbenefit'>
									<SettingsIcon />
									<h2>Integrate using Web API</h2>
									<p>
										It is simple to retrieve tracked time and task notes by
										employee in JSON format using ScreenshotMonitor API web
										service. Using this data you can integrate ScreenshotMonitor
										with your project management, accounting or other management
										processes.
									</p>
								</div>
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</div>
		</Fragment>
	);
};

HomePage.propTypes = {
	// prop: PropTypes
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
