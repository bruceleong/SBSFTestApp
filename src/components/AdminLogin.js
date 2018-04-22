import React, { Component } from 'react'
import { db } from '../config/constants'
import AdminPortal from './AdminPortal'

export default class AdminLogin extends Component {
    constructor() {
        super()
        this.state = {
            firstAttempt: true,
            adminLoggedIn: false
        }

    }

    handleSubmit = evt => {
        evt.preventDefault()

        let un = evt.target.userName.value
        let pw = evt.target.password.value

        db.collection('admin').doc('admin')
            .get()
            .then(doc => {
                if (doc.data()[un] === pw) {
                    this.setState({ adminLoggedIn: true })
                    localStorage.setItem('admin', 'true')
                } else {
                    this.setState({ firstAttempt: false })
                }
            })
    }


    componentDidMount() {

        // what I'm guessing we'd need. Assuming we're just storing admin data in
        // firestore

        // db.collection('admin')
        // .get()
        // .then(snapshot => {
        //     let allAdmin = []
        //     snapshot.forEach(doc => {
        //         allAdmin.push(doc.data().code)
        //     })
        //     this.setState({ allAdmin })
        // })

    }

    render() {
        return (
                !localStorage.getItem('admin')
                ? (
                    <div>
                        <h4>Enter Login Details:</h4>
                        <form onSubmit={this.handleSubmit}>
                            <label>Username: <input type="text" name="userName" />
                            </label>
                            <br />
                            <br />
                            <label>Password: <input type="password" name="password" />
                            </label>
                            <br />
                            <br />
                            <input type="submit" />
                        </form>
                        {
                            this.state.firstAttempt
                                ? null
                                : <p style={{ color: 'red' }}>We have notified the authorities</p>
                        }
                    </div>
                )
                : <AdminPortal history={this.props.history} />

        )
    }
}
