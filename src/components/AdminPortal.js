import React, { Component } from 'react'
import { db } from '../config/constants'
import AddEditCompany from './AddEditCompany'
import { Link } from 'react-router-dom'

export default class AdminPortal extends Component {
    constructor() {
        super()
        this.state = {
            allCompanies: []
        }
    }

    handleSubmit = evt => {
        evt.preventDefault()
        this.setState({ selectedCompany: evt.target.selectCompany.value })
    }

    onAdd = () => {
        this.setState({ selectedCompany: 'newCompany', adding: true })
    }

    onEdit = () => {
        this.setState({ edit: true, action: 'edit' })
    }

    onDelete = () => {
        //this.setState({ edit: true })
        this.setState({ action: 'delete' })
    }

    returnButton = () => {
        this.setState({ selectedCompany: '' })
    }

    handleDelete = (evt) => {
        evt.preventDefault()
        db.collection('companies').doc(evt.target.selectCompany.value).delete()
        this.getCompanies()
        
    }

    returnToSelectedCompany = company => {
        this.setState({ selectedCompany: company })
    }

    componentDidMount() {
        this.getCompanies()
        this.getNewsData()
        this.getVideoData()
    }

    getCompanies = () => {
        db.collection('companies')
            .get()
            .then(snapshot => {
                let allCompanies = []
                snapshot.forEach(doc => {
                    allCompanies.push(doc.data().name)
                })
                console.log('about to set state', allCompanies)
                this.setState({ allCompanies })
            })

    }

    getNewsData = () => {
        db.collection('articles').doc('newsArticles')
            .get()
            .then(snapshot => {
                let articles = snapshot.data(),
                    articleData = []

                Object.keys(articles).forEach(key => {
                    articleData.push([key, articles[key]])
                })
                this.setState({ articleData })
            })
    }

    getVideoData = () => {
        db.collection('videos').doc('videoData')
            .get()
            .then(snapshot => {
                let videos = snapshot.data(),
                    videoData = []

                Object.keys(videos).forEach(key => {
                    videoData.push([key, videos[key]])
                })
                this.setState({ videoData })
            })
    }

    render() {
        return (
            !this.state.selectedCompany
                ?
                (
                    <div>
                        <h1>Welcome Admin</h1>
                        {
                            !this.state.allCompanies
                                ?
                                <div>
                                    <h3>Currently there are no companies</h3>
                                </div>
                                :
                                <div>
                                    <h3>Currently there are: {this.state.allCompanies.length} companies</h3>
                                </div>

                        }
                        <h1>Would you like to add, edit, or delete a company?</h1>
                        <button type="button" onClick={this.onAdd}>Add Company</button>
                        <br />
                        <br />
                        <button type="button" onClick={this.onEdit}>Edit Company</button>
                        <br />
                        <br />
                        <button type="button" onClick={this.onDelete}>Delete Company</button>
                        <br />
                        <br />
                        {
                            this.state.action === 'edit' || this.state.action === 'delete'
                                ? (
                                    <div>
                                        <h1>What Company would you like to {this.state.action}?</h1>
                                        <form onSubmit={this.state.action === 'edit' ? this.handleSubmit : this.handleDelete}>
                                            <select name="selectCompany">
                                                {this.state.allCompanies.map(company => (
                                                    <option key={company} value={company}>{company}</option>
                                                ))}
                                            </select>
                                            <input type="submit" value={this.state.action} />
                                        </form>
                                    </div>
                                )
                                : null
                        }
                        <div>
                            <h2>Current Media: </h2>
                            {
                                !this.state.articleData
                                    ?
                                    <div>
                                        <h3>no articles</h3>
                                    </div>
                                    :
                                    <div>
                                        <h3>{this.state.articleData.length} articles</h3>
                                    </div>

                            }
                            {
                                !this.state.videoData
                                    ?
                                    <div>
                                        <h3>no videos</h3>
                                    </div>
                                    :
                                    <div>
                                        <h3>{this.state.videoData.length} videos</h3>
                                    </div>

                            }
                            <Link to="/AddEditMedia"><button type="button">Edit Media</button></Link>
                        </div>
                        <br />
                        <br />
                        <button
                            type="button" onClick={() => {
                                localStorage.removeItem('admin')
                                this.props.history.push(
                                    '/'
                                )
                            }}>Logout of Admin
                        </button>
                    </div>
                )
                : (<AddEditCompany company={this.state.selectedCompany} returnLink={this.returnButton} returnToSelectedCompany={this.returnToSelectedCompany} history={this.props.history} adding={this.state.adding} />)
        )
    }
}
