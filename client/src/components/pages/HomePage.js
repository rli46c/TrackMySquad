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
import image from '../../stock/img/abc.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(4)
  }
}));

const HomePage = ({}) => {
  const classes = useStyles();
  return (
    <Fragment>
      <CssBaseline />
      <Appbar />
      <Container component='main' maxWidth='md' className={classes.root}>
        <Grid container spacing={5} alignItems='flex-end'>
          <Grid item xs={12} md={10}>
            <h1>This is Home page</h1>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

HomePage.propTypes = {
  // prop: PropTypes
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
