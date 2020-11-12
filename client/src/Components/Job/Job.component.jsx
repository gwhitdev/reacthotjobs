import React from 'react';

const Job = ( { job }) => {

    return (
        <div className="collection with-header ">
            <ul>
                <li className="collection-header deep-orange lighten-5"><a href={`${job.url}`}target="_blank"rel="noreferrer">
                    <i className="material-icons amber-text text-darken-3 ">whatshot</i>{job.title}
                </a></li>

                
                    <li className="collection-item ">{job.summary}</li>
            </ul>
        </div>
    )
}

export default Job;