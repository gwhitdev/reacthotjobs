import React from 'react';
import { connect } from 'react-redux';
import Job from '../Job/Job.component';
//import './JobsList.module.css';

const JobsList = ({ jobs }) => {
    return (
      <div className="container">
        { 
          jobs.length > 0 ?
          (
            <ul>
              {
                jobs.map((job) =>
                  (
                    <Job job={job} key={job.id}/>
                  )
                )
              }
            </ul>
          ) : null
        }
      </div>
    )
}

// Redux
const mapStateToProps = ({ fetchedJobs: { jobs } } ) => ({
  jobs
})

export default connect(mapStateToProps)(JobsList);