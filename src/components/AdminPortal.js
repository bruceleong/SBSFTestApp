import React, { Component } from 'react'
import { db } from '../config/constants'
import AddEditCompany from './AddEditCompany'


export default class AdminPortal extends Component {
    constructor() {
        super()
        this.state = {}
    }

    handleSubmit = evt => {
        evt.preventDefault()
        this.setState({ selectedCompany: evt.target.selectCompany.value })
    }

    onAdd = () => {
        this.setState({ selectedCompany: 'newCompany' })
    }

    onEdit = () => {
        this.setState({ edit: true })
    }

    componentDidMount() {
        db.collection('companies')
            .get()
            .then(snapshot => {
                let allCompanies = []
                snapshot.forEach(doc => {
                    allCompanies.push(doc.data().name)
                })
                this.setState({ allCompanies })
            })
    }

    render() {
        console.log(this.props, 'current props')
        return (
            !this.state.selectedCompany
                ?
                (
                    <div>
                        <h1>Would you like to add a new company or edit an existing one?</h1>
                        <button type="button" onClick={this.onAdd}>Add Company</button>
                        <button type="button" onClick={this.onEdit}>Edit Company</button>
                        <button onClick={() => {
                            localStorage.removeItem('admin')
                            this.props.history.push(
                                '/'
                            )
                        }}>Logout of Admin</button>
                        {
                            !this.state.edit
                                ? null
                                : (
                                    <div>
                                        <h1>What Company would you like to edit?</h1>
                                        <form onSubmit={this.handleSubmit}>
                                            <select name="selectCompany">
                                                {this.state.allCompanies.map(company => (
                                                    <option key={company} value={company}>{company}</option>
                                                ))}
                                            </select>
                                            <input type="submit" />
                                        </form>
                                    </div>
                                )
                        }
                    </div>
                )
                : (<AddEditCompany company={this.state.selectedCompany} history={this.props.history} />)
        )
    }
}
