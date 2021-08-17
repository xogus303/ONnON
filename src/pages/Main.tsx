import React from 'react';

type MainProps = {
    match: Object;
    location: Object;
    history: Object;
}

function Main ({ match, location, history }: MainProps) {
    console.log('match', match);
    console.log('location', location);
    console.log('history', history);
    return (
        <div>메인!</div>
    )
}

export default Main