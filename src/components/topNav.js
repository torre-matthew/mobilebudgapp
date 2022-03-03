import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';

class TopNav extends React.Component {

  state = {
    profilePic: ""
  }

  componentDidMount () {
    this.getProfilePic();
  }

  getProfilePic = () => {
    let profilePic = sessionStorage.getItem("profilePic");
    this.setState({profilePic: profilePic})
  }
  render () {
      return (
        <div className=" flex-grow">
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className=" mr-2"
                color="inherit"
                aria-label="menu"
                size="large">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className=" flex-grow">
              <Link to="/">Lahri</Link>
              </Typography>
              <BasicMenu 
                profilePic={this.state.profilePic}
                logOut={this.props.logOut} />  
            </Toolbar>
          </AppBar>
        </div>
      );
    }
}



function BasicMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick} >
        <Avatar src={props.profilePic} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => {handleClose(); props.logOut()}}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default TopNav;
