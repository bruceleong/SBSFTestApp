import React, { Component } from 'react'
import { db } from '../config/constants'
import EditForm from './EditForm.jsx'
import firebase from 'firebase'
require('firebase/firestore');

const AddEditCompanyData = (props) => (
    <div>
        <h2>{props.container.companyName} Company Info</h2>
        <h3>Company Name: {props.container.companyName}</h3>
        <h3>Company Provider: {props.container.companyProvider}</h3>
        <h3>Company Provider Website: {props.container.providerWebsite}</h3>
        <a target="_blank" rel="noopener noreferrer" href={props.container.spd}><h3>Summary Plan Description:  {props.container.spd}</h3></a>
        <form onSubmit={props.container.updateCompanyProfile}>
            <div>
                <label htmlFor="companyName">Company Name:</label><input
                    name="companyName" value={props.container.companyName}
                    required
                    onChange={() => props.container.handleChange(props.container.companyName)} />
            </div>
            <div>
                <label htmlFor="companyProvider">Company Provider:</label><input
                    name="companyProvider" value={props.container.companyProvider}
                    required
                    onChange={props.container.handleChange} />
            </div>
            <div>
                <label htmlFor="providerWebsite">Company Provider Website:</label><input
                    name="providerWebsite" value={props.container.providerWebsite}
                    required
                    onChange={props.container.handleChange} />
            </div>
            <div>
                <label htmlFor="companyProvider">Summary Plan Description:</label><input
                    name="spd" value={props.container.spd}
                    required
                    onChange={props.container.handleChange} />
            </div>
            <button type="submit" onClick={props.container.submitChanges}>Submit Changes</button>
            <br />
            {
                props.container.changesSubmitted &&
                <div>
                    <br />
                    <button type="button" onClick={props.container.submitChanges}>Click to make additional changes</button>
                    <br />
                    <h1>
                        Your changes were submitted
                    </h1>
                </div>
            }
        </form>
    </div>

)

export default AddEditCompanyData
