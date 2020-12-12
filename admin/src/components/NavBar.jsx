import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class NavBar extends React.Component {
    render() {
        const { title } = this.props;
        return (
            <AppBar position="fixed" className="appBar">
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default NavBar;