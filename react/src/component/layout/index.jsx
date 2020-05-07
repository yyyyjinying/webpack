/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
const About = () => (
    <div>
      <h2>About</h2>
    </div>
  )
export default class MainLayout extends React.Component {

    render() {
        return (
            <div className='main-layout'>
                2121
                <div>
                    <Switch>
                        <Route path="/about" component={About}></Route>
                    </Switch>
                </div>
            </div>
        );
    }
}