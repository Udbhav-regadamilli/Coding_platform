import React from 'react';

function ProblemStatement({problemStatement}){
    return(
        <div>
            <h3>Problem statement:</h3>
            <p>{problemStatement}</p>
        </div>
    );
}

export default ProblemStatement;