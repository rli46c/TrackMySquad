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
    backgroundColor: 'red'
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
          <Grid xs={12} md={10}>
            This is Home page
            <img src={image} alt='hghjg' />
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
