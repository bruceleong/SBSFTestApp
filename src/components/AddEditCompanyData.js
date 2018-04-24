import React, { Component } from 'react'
import { db } from '../config/constants'
import EditForm from './EditForm.jsx'
import firebase from 'firebase'
require('firebase/firestore')

export default class AddEditCompanyData extends Component() {
    constructor(){
        super()
        this.state = {
            companyName: '',
            companyProvider: '',
            spd: '',
            providerWebsite: ''

        }
    }

    componentDidMount() {
        this.updateCompanyData()
    }


    handleChange = (evt, blah) => {
        console.log('in handle change', 'evt', evt, 'blah', blah )
        console.log('evt.target', evt.target, )

        this.setState({ [evt.target.name]:  blah})
    }

    submitChanges = () => {
        this.setState({ changesSubmitted: !this.state.changesSubmitted})
    }

    updateCompanyProfile = (evt) => {
        evt.preventDefault()
        db.collection('companies').doc(this.state.companyName)
            .set({ providerName: this.state.companyProvider, spd: this.state.spd, name: this.state.companyName, providerWebsite: this.state.providerWebsite }, { merge: true })
            .then(() => {
                this.updateCompanyData()
            })

    }

    updateCompanyData = () => {
        if (this.props.company !== 'newCompany') {

            let companyRef = db.collection('companies').doc(this.props.company)

            companyRef.collection('Forms').doc('formDoc')
                .get()
                .then(data => {
                    companyRef
                        .get()
                        .then(doc => {
                            let spd = doc.data().spd

                            this.setState({ companyName: this.props.company, companyProvider: doc.data().providerName, providerWebsite: doc.data().providerWebsite, spd })
                        })
                })
        }
    }

    render(){
        return (
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
    }

}
