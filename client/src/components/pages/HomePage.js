import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  makeStyles,
  CssBaseline,
  Grid,
  Paper,
  Container
} from '@material-ui/core';
import { ArchiveRounded } from '@material-ui/icons';

import Appbar from '../layout/Appbar';
import bgImage from '../../stock/img/site_bg.png';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  bgbanner:{
    backgroundImage: `url(${bgImage})`,
    position: 'relative',
    top: '0px'
  },
  paper: {
    height: 140,
    width: 100,
  },
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
          <Grid container justify="center" spacing={2}>
            <Grid  item md={3}>
              <Paper className={classes.paper} />
            </Grid>
            <Grid  item md={3}>
              <Paper className={classes.paper} />
            </Grid>
            <Grid  item md={3}>
              <Paper className={classes.paper} />
            </Grid>
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
