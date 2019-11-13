import React from "react"
import {Route, Redirect} from "react-router-dom"
import {connect} from "react-redux"

// test git asdfasdf
const PrivateRoute = ({authenticated, component: Component, ...otherProps}) => (
    <Route 
        {...otherProps}
        render={(props) => (
            authenticated !== false ? 
            <Component {...props} />
            : <Redirect to={{
                pathname: "/users/login",
                state: {from: props.location}
            }}/>
        )}
    />
)

const mapStateToProps = ({userReducer: {currentUser}}) => ({
    authenticated: !!currentUser
})

export default connect(mapStateToProps)(PrivateRoute)