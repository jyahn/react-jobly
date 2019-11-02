import React, { Component } from "react";
import JobCard from './JobCard';
import JoblyApi from './JoblyApi';
// import { Redirect } from 'react-router-dom';
import { Input } from 'reactstrap';
import './Jobs.css'


class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      salaryFilter: "",
      search: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  async componentDidMount() {
    let jobs = await JoblyApi.getJobs()
    jobs.sort((a, b) => a.salary - b.salary);
    this.setState({
      jobs
    })
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    let jobs = await JoblyApi.getJobsByMinSalary({ salary: this.state.salaryFilter })
    jobs.sort((a, b) => a.salary - b.salary);
    this.setState({
      jobs
    })
  }

  async handleSearchSubmit(evt) {
    evt.preventDefault()
    let jobs = await JoblyApi.getJobsBySearch({ search: this.state.search })
    jobs.sort((a, b) => a.salary - b.salary);
    this.setState({
      jobs
    })
  }

  render() {
    return (

      <div className="Jobs">
        <div className="Jobs-content row">
          <div className="Jobs-search text-center col-4 offset-2 mt-3">
            <form
              className="Jobs-searchForm form-group"
              onSubmit={this.handleSearchSubmit}>
              <input
                className="Jobs-input form-control"
                type="text"
                value={this.state.search}
                name="search"
                placeholder="Enter search term.."
                onChange={this.handleChange}
              />
              <button className="Jobs-search-button btn btn-success btn-md mt-3">Search</button>
            </form>
          </div>

          <div className="SalaryForm col-4 offset-2 mt-3">
            <form onSubmit={this.handleSubmit}>
              <h5 className="text-success"><b>Salary estimate </b></h5>
              <Input
                type="radio"
                name="salaryFilter"
                value="50000"
                checked={this.state.salaryFilter === "50000"} onChange={this.handleChange} /> $50,000+ <br />
              <Input
                type="radio"
                name="salaryFilter"
                value="75000"
                checked={this.state.salaryFilter === "75000"} onChange={this.handleChange} /> $75,000+ <br />
              <Input
                type="radio"
                name="salaryFilter"
                value="100000"
                checked={this.state.salaryFilter === "100000"} onChange={this.handleChange} /> $100,000+ <br />
              <Input
                type="radio"
                name="salaryFilter"
                value="125000"
                checked={this.state.salaryFilter === "125000"} onChange={this.handleChange} /> $125,000+ <br />
              <Input
                type="radio"
                name="salaryFilter"
                value="150000"
                checked={this.state.salaryFilter === "150000"} onChange={this.handleChange} /> $150,000+ <br /> <br />
              <button type="submit" className="btn btn-sm btn-success"> Apply Filter </button>
            </form>
          </div>

          {this.state.jobs.length ? (
            <div className="Jobs-container row ml-5 mr-5">
              {this.state.jobs.map(job => (
                //mb-3 sets the margin-bottom spacing
                <div key={job.id} className="Jobs-item col-lg-4 col-md-6 mt-3 px-3">
                  <JobCard job={job} handleClick={this.handleClick} />
                </div>
              ))}
            </div>
          ) : (<h1>No Jobs Found</h1>
            )}
        </div>
      </div >
    );
  }
}

export default Jobs;