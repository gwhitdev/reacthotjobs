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

      let searchStr = searchForm;
      //let confirmStr = searchStr.search(/[^A-Za-z0-9]\s+/g);
      //let replacedStr = searchStr.replace(/[^\w\s]/gi, '');
      let maxStr = maxJobs;
      //let replacedMax = maxStr.replace(/[^\d\s]/gi, '');
console.log(searchStr,maxStr);
      if (searchForm && maxJobs) {
        this.fetchJobs(searchForm,maxJobs);
        return this.setState({msg: false});
      } else {
        return this.setState({msg: true});
      }
      /*
      console.log('1 str:',confirmStr);
      console.log('1 num:',confirmMax);
if (searchForm && maxJobs) {
  if (confirmStr === -1 && confirmMax === 0) {
    console.log('2 str:',confirmStr);
    console.log('2 num:',confirmMax);
    this.fetchJobs(e);
    this.setState({msg: false});
  } else {
    return this.setState({msg: true});    
  } } else {
  return this.setState({msg: true});    
}*/
   
}

  componentDidMount() {
   
  }

  fetchJobs =  (replacedStr, replacedMax) => {
    const { toggleLoading, searchForm, maxJobs, setJobs } = this.props;
    console.log(replacedStr, replacedMax);
    //e.preventDefault();
    toggleLoading();
    let url = `/search/${replacedStr}/${replacedMax}`;
    console.log(url);
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
