import React from 'react';
import { connect } from 'react-redux';

import JobsList from './Components/JobsList/JobsList.component';
import Loading from './Components/Loading/Loading.component';
import { setJobs, toggleLoading, getJobs, setMax } from './redux/job/job.actions';

import './App.css';

class App extends React.Component {
  
  fetchJobs = (e) => {
    e.preventDefault();

    const { setJobs, toggleLoading, searchField, maxJobs } = this.props;

    toggleLoading();

    let url = `/api/jobs?q=${searchField}&l=England&country=uk&max=${maxJobs}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      
    })
      .then((response) => response.json())
      .then(jobs => {setJobs(jobs)})
      .catch((error) => {
        console.log(error);
      })
      .then(() => toggleLoading())
      
  }

  render() {
    
    const { loading, getJobs, searchField, maxJobs, setMax } = this.props;

    return (
      
      <div className="container">
        <div className="row ">
          <div className="col s12">
            <h1 className="center-align"> Welcome to <span className="title amber-text">Hotjobs</span></h1>
          </div>
              <div className="col s12 ">
                <div className="row ">
                  <form className="col s11 offset-s1 " onSubmit={this.fetchJobs}>
                    <div className="row ">
                      <div className="input-field col s6">
                      <i class="material-icons prefix">create</i>
                        <input 
                          name="searchField"
                          type="search"
                          value={searchField}
                          onChange={(e) => getJobs(e.target.value)}
                          
                        />
                        <label htmlFor="search field"className="active">Search jobs</label>
                      </div>
                      <div className="input-field col s3">
                      
                        <input
                          name="maxJobs"
                          className="col s3"
                          type="number"
                          placeholder='Maximum number of jobs'
                          value={maxJobs}
                          onChange={(e) => setMax(e.target.value)}
                        />
                        <label className="active" htmlFor="maxJobs">Max. jobs in list</label>
                      </div>
                    
                    
                    <div className="input-field col s3 ">
                      <button type="submit"className="btn waves-effect waves-light amber">Search <i className="material-icons right">whatshot</i></button>
                    </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div> 
            
                    {
                      loading ? <Loading /> : <JobsList /> 
                    }
            </div>
                
        
          </div>
        
      
    );
  }
  
}

const mapStateToProps = ({fetchedJobs: {loading, search, max}}) => ({
  loading,
  searchField: search,
  maxJobs: max
})

const mapDispatchToProps = dispatch => ({
  setJobs: jobs => dispatch(setJobs(jobs)),
  toggleLoading: () => dispatch(toggleLoading()),
  getJobs: search => dispatch(getJobs(search)),
  setMax: max => dispatch(setMax(max))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
