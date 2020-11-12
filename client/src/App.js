import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import JobsList from './Components/JobsList/JobsList.component';
import Loading from './Components/Loading/Loading.component';
import SearchForm from './Components/SearchForm/SearchForm.component';

import { setJobs, toggleLoading } from './redux/job/job.actions';

import './App.css';


class App extends React.Component {

  fetchJobs = async (e) => {
    e.preventDefault();

    const { toggleLoading, searchForm, maxJobs, setJobs } = this.props;

    toggleLoading();

    //let url = `api/jobs?q=${searchForm}&l=England&country=uk&max=${maxJobs}`;
    let url = `/search/${searchForm}/${maxJobs}`;

    console.log(url);
    await axios.get(url)
      .then((res) => {
        console.log(res);
        if (res.data === null || res.data === undefined) {
          console.error('data is null or undefined')
        } else {
          setJobs(res.data)
          toggleLoading();
        }
      })
      .catch(err => console.error(err))
      
  }

  render() {
    
    const { loading } = this.props;

    return (
      
      <div className="container">
        <div className="row ">
          <div className="col s12">
            <h1 className="center-align"> Welcome to <span className="title amber-text">Hotjobs</span></h1>
          </div>
            <div className="col s12 ">
              <SearchForm onSubmit={this.fetchJobs}/>
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
  searchForm: search,
  maxJobs: max

})

const mapDispatchToProps = dispatch => ({
  setJobs: jobs => dispatch(setJobs(jobs)),
  toggleLoading: () => dispatch(toggleLoading()),
  
  
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
