import React from 'react';
import { connect } from 'react-redux';
import { getJobs, setMax } from '../../redux/job/job.actions';

const SearchForm = ({ searchForm, maxJobs, onSubmit, getJobs, setMax }) => {

    return (
        <div className="row ">
                  <form className="col s11 offset-s1 " onSubmit={onSubmit}>
                    <div className="row ">
                      <div className="input-field col s6">
                      <i class="material-icons prefix">create</i>
                        <input 
                          name="searchField"
                          type="search"
                          value={searchForm}
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
    )
}

const mapStateToProps = ({ fetchedJobs: { max, search } }) => ({
    maxJobs: max,
    searchForm: search
})

const mapDispatchToProps = dispatch => ({
    setMax: max => dispatch(setMax(max)),
    getJobs: jobs => dispatch(getJobs(jobs))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);