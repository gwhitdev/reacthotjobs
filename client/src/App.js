import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import JobsList from './Components/JobsList/JobsList.component';
import Loading from './Components/Loading/Loading.component';
import SearchForm from './Components/SearchForm/SearchForm.component';

import { setJobs, toggleLoading } from './redux/job/job.actions';

import './App.css';


class App extends React.Component {
  state = {
    msg: false
  }

  checkParams = (e) => {
    const { searchForm, maxJobs } = this.props;
    e.preventDefault();
    this.setState({msg: false});

    if (searchForm && maxJobs) {
      //console.log('boolean searhForm', Boolean(searchForm));
      //console.log('state error:', this.state.msg);
      this.fetchJobs(e);
      return this.setState({msg: false});
    } else {
      //console.log('boolean searchForm', Boolean(searchForm));
      //console.log('state error:',this.state.msg);
      //console.log('Triggered false');
      return this.setState({msg: true});    
    }
  }

  componentDidMount() {
   
  }

  fetchJobs =  (e) => {
    const { toggleLoading, searchForm, maxJobs, setJobs } = this.props;
    
    e.preventDefault();
    toggleLoading();
    let url = `/search/${searchForm}/${maxJobs}`;
    axios.get(url)
      .then((res) => {
        console.log(res);
          if (res.data === null || res.data === undefined) {
            console.error('data is null or undefined');
            setJobs('Sorry, no data was received.')
          } else {
            setJobs(res.data)
            toggleLoading();
          }
      })
      .catch(err => console.error(err))
  }

  render() {
    
    const { loading } = this.props;
    const { msg } = this.state;
    //console.log('render error',msg);
    return (
      
      <div className="container">
        <div className="row ">
          <div className="col s12">
            <h1 className="center-align"> Welcome to <span className="title amber-text">Hotjobs</span></h1>
          </div>
            <div className="col s12 ">
              <SearchForm onSubmit={this.checkParams}/>
            </div>
          </div>
          <div> 
          
          { msg ? <div className="center-align"><h4>Please make sure you enter the correct information to search. <br />Try again.</h4></div> : (loading ? <Loading /> : <JobsList />)}
          
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
