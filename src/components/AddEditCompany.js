import React, { Component } from 'react'
import { db } from '../config/constants'
import firebase from 'firebase'
require('firebase/firestore');

export default class AddEditCompany extends Component {
    constructor(props) {
        super(props)
        this.updateCompanyData()
        this.state = {
            companyName: '',
            companyProvider: '',
            companyData: [],
            spd: '',
            companyFormName: '',
            companyFormUrl: ''
        }
        this.formHandleSubmit = this.formHandleSubmit.bind(this)
    }

    handleChange = evt => {
        this.setState({ [evt.target.name]: evt.target.value })
    }

    formHandleSubmit(evt) {
        evt.preventDefault()
        db.collection('companies').doc(this.props.company).collection('Forms')
            .doc('formDoc')
            .set({ [evt.target.companyFormName.value]: evt.target.companyFormUrl.value }, { merge: true })
        this.setState({
            companyFormName: '',
            companyFormUrl: ''
        })
        this.updateCompanyData()
    }

    componentDidMount() {
        this.updateCompanyData()
    }

    updateCompanyData = () => {
        if (this.props.company !== 'newCompany') {

            let companyRef = db.collection('companies').doc(this.props.company)

            companyRef.collection('Forms').doc('formDoc')
                .get()
                .then(doc => {
                    let formObj = doc.data(),
                        companyData = []
                    Object.keys(formObj).forEach(key => {
                        if (key){
                        companyData.push([key, formObj[key]])
                        }
                    })
                    return { companyData, companyName: this.props.company }

                })
                .then(data => {
                    companyRef
                        .get()
                        .then(doc => {
                            let spd = doc.data().spd
                            db.collection('providers').doc(doc.data().providerName)
                                .get()
                                .then(providerDoc => {
                                    this.setState({ companyData: data.companyData, companyName: data.companyName, companyProvider: providerDoc.data().name, spd })
                                })
                        })
                })
        }
    }
    render() {
        console.log(this.props, 'current props')
        return (
            <div>
                <h2>General Company Info</h2>
                <form onClick={this.handleSubmit}>
                    {/*labels for each piece of company of data*/}
                    <div>
                        <label htmlFor="companyName">Company Name:</label><input name="companyName" value={this.state.companyName} />
                    </div>
                    <div>
                        <label htmlFor="companyProvider">Company Provider:</label><input name="companyProvider" value={this.state.companyProvider} />
                    </div>
                    <div>
                        <label htmlFor="companyProvider">Summary Plan Description:</label><input name="spd" value={this.state.spd} />
                    </div>
                </form>
                <h2>Company Forms</h2>
                <form onSubmit={this.formHandleSubmit}>
                    <h3>Add new Forms</h3>
                    <div>
                        <label htmlFor="companyFormName">Name of form:</label><input name="companyFormName" onChange={this.handleChange}
                            value={this.state.companyFormName} />
                    </div>
                    <div>
                        <label htmlFor="companyFormUrl">Url of form:</label><input name="companyFormUrl" onChange={this.handleChange}
                            value={this.state.companyFormUrl} />
                    </div>
                    <input type="submit" />
                    <h3>Current Forms:</h3>
                    <ul>
                        {this.state.companyData.map((ele, idx) => (
                            <div key={ele[0]}>
                            <br />
                                <a target="_blank" href={ele[1]} style={{ display: 'inline' }}>
                                    {ele[0]}
                                </a> <button onClick={() => {
                                    db.collection('companies').doc(this.state.companyName).collection('Forms').doc('formDoc').update({
                                        [ele[0]]: firebase.firestore.FieldValue.delete()
                                    })
                                    this.updateCompanyData()
                                }}>Delete</button>
                                <br />
                            </div>
                        ))}
                    </ul>
                </form>
                <button onClick={() => {
                    localStorage.removeItem('admin')
                    this.props.history.push(
                        '/'
                    )
                }}>Logout of Admin</button>
            </div>
        )
    }
}
