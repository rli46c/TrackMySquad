import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles, Table, TableHead, TableBody, TableRow, TableCell, Link, Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import { getAllProjects, getAllProjectTypes, setAddProjectDialog } from '../../../actions/projectAction'
import { getMemberNamesAndDefaultRoles } from '../../../actions/teamAction';
import { getCompanyNames } from '../../../actions/companyAction';
import { getAllUserTypes } from '../../../actions/teamAction';
import AddNewProject from './AddNewProject';
import EditProjectDetails from './EditProjectDetails';
import CompanyNamesCard from '../company/CompanyNamesCard';
import UserTypesCard from '../team/UserTypesCard';


const useStyles = makeStyles(theme => ({
    seeMore: {
      marginTop: theme.spacing(3),
    },
    addMemberIcon: {
      position: 'fixed',
      right: theme.spacing(3),
      bottom: theme.spacing(3)
    },
}));


export const ProjectsList = ({
    project: { projects, projectToEdit, addProjectDialogOpen, projectErrors },
    team: { getAllMembers },
    getAllProjects,
    setAddProjectDialog }) => {

    useEffect(()=>{
        getAllProjects();
    }, [getAllProjects]);

    const classes = useStyles();

    console.log(projects);
    
    return (
        <Fragment>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>User Type</TableCell>
                        <TableCell>Company Type</TableCell>
                        <TableCell>User Email</TableCell>
                        <TableCell align="center" colSpan="2">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* { projects.map((member, id) => <MemberCard key={id} memberData={member} />) } */}
                </TableBody>
            </Table>

            <div className={classes.seeMore}>
                <Link color="primary" href="#">
                    See more members
                </Link>
            </div>

            <Fab className={ classes.addMemberIcon } onClick={ ()=>setAddProjectDialog(true) } 
                color="primary" aria-label="add">

                <Add />
            </Fab>

            {/* { addProjectDialogOpen && <AddNewProject /> }
            { (Object.entries(projectToEdit).length !== 0) && <EditProjectDetails /> } */}
        </Fragment>
    );
};

ProjectsList.propTypes = {
    project: PropTypes.object.isRequired,
    team: PropTypes.object.isRequired,
    getAllProjects: PropTypes.func.isRequired,
    setAddProjectDialog: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    project: state.project,
    team: state.team
});

const mapDispatchToProps = {
    getAllProjects, setAddProjectDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);