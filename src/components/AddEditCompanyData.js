<div>
                    <h2>{this.state.companyName} Company Info</h2>
                    <h3>Company Name: {this.state.companyName}</h3>
                    <h3>Company Provider: {this.state.companyProvider}</h3>
                    <h3>Company Provider Website: {this.state.providerWebsite}</h3>
                    <a target="_blank" rel="noopener noreferrer" href={this.state.spd}><h3>Summary Plan Description:  {this.state.spd}</h3></a>
                    <form onSubmit={this.updateCompanyProfile}>
                        <div>
                            <label htmlFor="companyName">Company Name:</label><input
                                name="companyName" value={this.state.companyName}
                                required
                                onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor="companyProvider">Company Provider:</label><input
                                name="companyProvider" value={this.state.companyProvider}
                                required
                                onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor="providerWebsite">Company Provider Website:</label><input
                                name="providerWebsite" value={this.state.providerWebsite}
                                required
                                onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor="companyProvider">Summary Plan Description:</label><input
                                name="spd" value={this.state.spd}
                                required
                                onChange={this.handleChange} />
                        </div>
                        <button type="submit" onClick={() => { this.setState({ changesSubmitted: !this.state.changesSubmitted }) }}>Submit Changes</button>
                        <br />
                        {
                            this.state.changesSubmitted &&
                            <div>
                                <br />
                                <button type="button" onClick={() => { this.setState({ changesSubmitted: !this.state.changesSubmitted }) }}>Click to make additional changes</button>
                                <br />
                                <h1>
                                    Your changes were submitted
                              </h1>
                            </div>
                        }
                    </form>