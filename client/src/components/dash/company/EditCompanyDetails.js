import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Slide, 
    FormControl, InputLabel, NativeSelect, Button, TextField } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { setEditCompanyDialog, getAllCompanyTypes, updateCompany } from '../../../actions/companyAction';
import CompanyTypesCard from './CompanyTypesCard';



const useStyles = makeStyles(theme=>({
    root: {
        '& > *': {
          margin: theme.spacing(1),
        //   width: '100%',
        },
        marginRight: theme.spacing(2)
    },
    dialogTitle: {
        textAlign: 'right'
    },
    spanTitle: {

    },
    spanGap: {
        padding: '0px 30%'
    },
    times: {
        color: '#555'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export const EditCompanyDetails = ({ 
    company: { editCompanyDialogOpen, companyToEdit, companyTypes }, 
    setEditCompanyDialog,
    getAllCompanyTypes,
    updateCompany }) => {

    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('sm');
    const [name, setName] = useState('');
    const [companyType, setCompanyType] = useState('');
    const [adrs, setAdrs] = useState('');

    useEffect(()=>{
        getAllCompanyTypes();
        
    }, [getAllCompanyTypes]);

    useEffect(()=>{
        setName(companyToEdit.companyName);
        setCompanyType(companyToEdit.companyType);
        setAdrs(companyToEdit.companyAddress);
        
    }, [companyToEdit]);

    const onSelect = (e) => {
        const selectedCompany = {
            _id: e.target.value,
            companyType: e.target.options[e.target.selectedIndex].text
        };

        setCompanyType(selectedCompany);
    };

    const onReset = (e) => {
        e.preventDefault();
        setName('');
        setCompanyType({ _id: '' });
        setAdrs('');
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const companyData = { 
            _id: companyToEdit._id, 
            companyName: name, 
            companyType: companyType, 
            companyAddress: adrs 
        };
        
        updateCompany(companyData);
        onReset(e);
        setEditCompanyDialog(false);
    }

    const classes = useStyles();

    return (
    <Dialog keepMounted disableBackdropClick onClose={ ()=>setEditCompanyDialog(false) }
    open={editCompanyDialogOpen} TransitionComponent={Transition} fullWidth={fullWidth} 
    maxWidth={maxWidth} aria-labelledby="add-company-profile" aria-describedby="add-company-modal">
        <DialogTitle className={ classes.dialogTitle } id="add-company-profile">
            <span className={ classes.spanTitle }>Edit Company Profile</span>
            <span className={ classes.spanGap }>&nbsp;</span>
            <Close className={ classes.times } onClick={ ()=>setEditCompanyDialog(false) } />
        </DialogTitle>
        <DialogContent>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}
                onKeyPress={ (e)=>{ (e.key === 'Enter') && e.preventDefault() } } id="add-company-modal">
                {/* <DialogContentText>Some Text</DialogContentText> */}
                <FormControl variant="standard" className={classes.formControl} fullWidth>
                    <InputLabel htmlFor="company-type">Company Type</InputLabel>
                    <NativeSelect value={ companyType._id } onChange={ onSelect } id="company-type" autoFocus tabIndex="1" >
                        <option value="" />
                        { companyTypes.map((type, id) => <CompanyTypesCard key={id} compType={type} />) }
                    </NativeSelect>
                </FormControl>
                {/* <TextField value={ type } onChange={ (e)=>setType(e.target.value) } label="Type" variant="outlined" fullWidth tabIndex="2" /> */}
                <TextField value={ name } onChange={ (e)=>setName(e.target.value) } label="Name" variant="outlined" fullWidth tabIndex="2" />
                <TextField value={ adrs } onChange={ (e)=>setAdrs(e.target.value) } label="Address" variant="outlined" fullWidth tabIndex="3" />
            </form>
        </DialogContent>
        <DialogActions>
            <Button onClick={onReset} color="primary" tabIndex="-1">
                Reset
            </Button>
            <Button onClick={ onSubmit } color="secondary" variant="contained" tabIndex="0">
                Update Profile
            </Button>
        </DialogActions>
    </Dialog>
    );
};

EditCompanyDetails.propTypes = {
    company: PropTypes.object.isRequired,
    setEditCompanyDialog: PropTypes.func.isRequired,
    getAllCompanyTypes: PropTypes.func.isRequired,
    updateCompany: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    company: state.company
});

const mapDispatchToProps = {
    setEditCompanyDialog, getAllCompanyTypes, updateCompany
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCompanyDetails);