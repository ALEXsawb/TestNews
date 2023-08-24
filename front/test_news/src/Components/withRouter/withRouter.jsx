import {useParams, useSearchParams} from "react-router-dom";
import React from "react";

const withRouter = WrappedComponent => props => {
    const params = useParams();
    const [searchParams] = useSearchParams();
    return (
        <WrappedComponent
            {...props}
            params={params}
            searchParams={searchParams}
        />
    );
};

export default withRouter;