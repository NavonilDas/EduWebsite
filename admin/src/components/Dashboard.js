import React from 'react';
import NavBar from './NavBar';

class Dashboard extends React.Component {
    render() {
        return (
            <main className="admin-content">
                <NavBar title="Home" />
                <div className="admin-body">Crndsajs</div>
            </main>
        );
    }
}

export default Dashboard;