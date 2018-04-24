import React, { Component } from 'react'
import { db } from '../config/constants'
import EditForm from './EditForm.jsx'
import firebase from 'firebase'
require('firebase/firestore')

export default class AddEditCompany extends Component {
    constructor(props) {
        super(props)
        this.state = {
            companyName: '',
            companyProvider: '',
            companyData: [],
            spd: '',
            companyFormName: '',
            companyFormUrl: '',
            changesSubmitted: false,
            adding: true
        }
        //exists to make load time a little faster

        this.updateCompanyData()
    }

    componentDidMount() {
        console.log('in componentDidMount')
        this.updateCompanyData()
    }

    editForm = (form, url) => {
        this.setState({ formToUpdate: form, formURL: url })
    }

    removeFormToUpdate = () => {
        this.setState({ formToUpdate: '' })
        this.updateCompanyData()
    }

    handleChange = evt => {
        this.setState({ [evt.target.name]: evt.target.value })
    }

    formHandleSubmit = evt => {
        evt.preventDefault()
        db.collection('companies').doc(this.state.companyName).collection('Forms')
            .doc('formDoc')
            .set({ [evt.target.companyFormName.value]: evt.target.companyFormUrl.value }, { merge: true })
        console.log('firestore form has been set')
        let newCompanyData = this.state.companyData.concat([evt.target.companyFormName.value, evt.target.companyFormUrl.value])
        this.setState({
            companyFormName: '',
            companyFormUrl: '',
            companyData: newCompanyData
        })
        console.log('in formHandleSubmit')
    }

    updateCompanyProfile = (evt) => {
        evt.preventDefault()
        db.collection('companies').doc(this.state.companyName)
            .set({ providerName: this.state.companyProvider, spd: this.state.spd, name: this.state.companyName, providerWebsite: this.state.providerWebsite }, { merge: true })
            .then(() => this.updateCompanyData())

    }

    updateCompanyData = () => {
        console.log('in updateComanyData')

        if (this.props.company !== 'newCompany') {

            let companyRef = db.collection('companies').doc(this.props.company)

            companyRef.collection('Forms').doc('formDoc')
                .get()
                .then(doc => {
                    let formObj = doc.data(),
                        companyData = []
                        console.log('formObj is', formObj)
                    if (formObj){
                        Object.keys(formObj).forEach(key => {
                            companyData.push([key, formObj[key]])
                        })
                    }
                    return { companyData, companyName: this.props.company }

                })
                .then(data => {
                    companyRef
                        .get()
                        .then(doc => {
                            //spd is now required so ignore error that comes up when spd is not defined
                            let spd = doc.data().spd

                            this.setState({ companyData: data.companyData, companyName: data.companyName, companyProvider: doc.data().providerName, providerWebsite: doc.data().providerWebsite, spd, adding: false })
                        })
                })
        }
    }
    render() {
        console.log(this.props, 'current props')
        console.log(this.state, 'current name state')
        return (
            !this.state.formToUpdate
                ?
                <div>
                    <h2>{this.state.companyName} Company Info</h2>
                    <h3>Company Name: {this.state.companyName}</h3>
                    <h3>Company Provider: {this.state.companyProvider}</h3>
                    <h3>Company Provider Website: {this.state.providerWebsite}</h3>
                    <a target="_blank" rel="noopener noreferrer" href={this.state.spd}><h3>Summary Plan Description:  {this.state.spd}</h3></a>
                    <form onSubmit={this.updateCompanyProfile}>
                        <label style={{display: 'block', margin: '10px'}} htmlFor="companyName">Company Name:<input
                            name="companyName" value={this.state.companyName}
                            required
                            onChange={this.handleChange} />
                        </label>
                        <label style={{display: 'block', margin: '10px'}} htmlFor="companyProvider">Company Provider:<input
                            name="companyProvider" value={this.state.companyProvider}
                            required
                            onChange={this.handleChange} />
                        </label> 
                        <label style={{display: 'block', margin: '10px'}} htmlFor="providerWebsite">Company Provider Website:<input
                            name="providerWebsite" value={this.state.providerWebsite}
                            required
                            onChange={this.handleChange} />
                        </label>
                        <label style={{display: 'block', margin: '10px'}} htmlFor="companyProvider">Summary Plan Description:<input
                            name="spd" value={this.state.spd}
                            required
                            onChange={this.handleChange} />
                        </label>
                        <button type="submit" style={{display: 'block', margin: '0 auto'}} onClick={() => { this.setState({ changesSubmitted: !this.state.changesSubmitted, adding: false }) }}>Submit Changes</button>
                        {
                            this.state.changesSubmitted &&
                            <div>
                                <button style={{display: 'block', margin: '10px, auto'}}type="button" onClick={() => { 
                                    let newBool = !this.state.changesSubmitted; 
                                    this.setState({ changesSubmitted: newBool })
                                 }}>Click to make additional changes</button>
                                <h1>Your changes were submitted</h1>
                            </div>
                        }
                    </form>
                    {
                        this.state.adding
                            ? <h1>Lol, nope</h1>
                            : (
                                <div>
                                    <h2>Company Forms</h2>
                                    <form onSubmit={this.formHandleSubmit}>
                                        <h3>Add new Forms</h3>
                                        <div>
                                            <label htmlFor="companyFormName">Name of form:</label><input
                                                name="companyFormName" onChange={this.handleChange}
                                                value={this.state.companyFormName} />
                                        </div>
                                        <div>
                                            <label htmlFor="companyFormUrl">Url of form:</label><input
                                                name="companyFormUrl" onChange={this.handleChange}
                                                value={this.state.companyFormUrl} />
                                        </div>
                                        <input type="submit" />
                                    </form>
                                    <h3>Current Forms:</h3>
                                    <ul>
                                        {
                                            this.state.companyData.map((ele, idx) => (
                                                <div key={ele[0]}>
                                                    <br />
                                                    <p>Name of form: 
                                                        <a target="_blank" href={ele[1]} style={{ display: 'inline' }}>
                                                            {ele[0]}
                                                        </a>
                                                    </p>
                                                    <p>Link of form: 
                                                        <a target="_blank" href={ele[1]} style={{ display: 'inline' }}>
                                                            {ele[1]}
                                                        </a>
                                                    </p>
                                                    <button type="button" onClick={() => this.editForm(ele[0], ele[1])}>
                                                        Edit Link
                                                    </button>
                                                    <button
                                                        type='button'
                                                        onClick={
                                                            () => {
                                                                db.collection('companies').doc(this.state.companyName).collection('Forms')
                                                                .doc('formDoc')
                                                                .update({
                                                                    [ele[0]]: firebase.firestore.FieldValue.delete()
                                                                })
                                                                this.updateCompanyData()
                                                            }
                                                        }>Delete Form</button>
                                                    <br />
                                                    <br />
                                                </div>
                                            ))
                                        }
                                    </ul>
                                </div>
                            )
                    }
                    <button type="button" onClick={() => { this.props.returnLink() }}>Back to Admin Home</button>
                    <button type="button" onClick={() => {
                        localStorage.removeItem('admin')
                        this.props.history.push(
                            '/'
                        )
                    }}>Logout of Admin
                    </button>
                </div>
                :
                (
                    <EditForm formToUpdate={this.state.formToUpdate} formURL={this.state.formURL} company={this.state.companyName} returnLink={this.props.returnLink} returnToSelectedCompany={this.props.returnToSelectedCompany} removeFormToUpdate={this.removeFormToUpdate} history={this.props.history} />
                )
        )
    }
}
