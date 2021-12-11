
import './App.css';
import {useState,Fragment,createContext,useContext,useEffect} from 'react'
import{Switch,Route,useHistory,Redirect} from "react-router-dom";

// Material UI

// Popup Menu
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Tooltip from '@mui/material/Tooltip';

// App Bar
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

// Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// App Bar Icons
import MenuIcon from '@mui/icons-material/Menu';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NavigationIcon from '@mui/icons-material/Navigation';
import Fab from '@mui/material/Fab';

// App Drawer
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GroupIcon from '@mui/icons-material/Group';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';

// Dark Mode
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { createTheme, ThemeProvider } from '@mui/material/styles';  


export default function App()
{
 
  return  <Container/>
        
}

const context=createContext('')
const URL=`https://6166c50413aa1d00170a6723.mockapi.io`;

function Container() 
{
  let history=useHistory()
  const[data,setData]=useState([])
  let obj={history,data,setData}

  // Dark Mode/ Light Mode Condtional Styling
  let [themechange,setThemechange]=useState('dark')
  let lightmode=<Tooltip title="Light Mode"><LightModeIcon style={{fill:"gold"}}/></Tooltip>
  let darkmode=<Tooltip title="Dark Mode"><DarkModeIcon style={{fill:"white"}}/></Tooltip>
  let mode=(themechange==='light')?darkmode:lightmode
  let themebutton=<IconButton onClick={()=>setThemechange((themechange==='light')?'dark':'light')}>{mode}</IconButton>
 
  // App Drawer
  const [state, setState] = useState({left: false});
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };


  const Users=<p onClick={()=>history.push('/users')} style={{margin:'auto'}}>Users</p>
  const Adduser=<p onClick={()=>history.push('/Adduser')} style={{margin:'auto'}}>Adduser</p> 
  const Moreinfo=<p onClick={()=>history.push('/Moreinfo')} style={{margin:'auto'}}>More Info</p>
  const Settings=<p onClick={()=>history.push('/Settings')} style={{margin:'auto'}}>Settings</p>
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      
      <List>
        {[Users, Adduser,Moreinfo,Settings].map((text, index) => (
          <ListItem button key={index}>
            <ListItemIcon>
              {index ===0 ? <GroupIcon onClick={()=>history.push('/users')}  /> : null}
              {index ===1 ? <AddReactionIcon onClick={()=>history.push('/Adduser')}/> : null}
              {index ===2 ? <InfoIcon onClick={()=>history.push('/Moreinfo')} /> : null}
              {index ===3 ? <SettingsIcon onClick={()=>history.push('/Settings')}/> : null}
              {index===4  ? mode:null }
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>  
    </Box>)

    // Theme
   const theme = createTheme({
    palette: {mode:themechange},
  });

  return (
                <ThemeProvider theme={theme}>
                <Paper elevation={0} style={{borderStyle:"none",minHeight:"100vh"}}>

                <div className="App">
                
                {/* Header */}
                <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{height:"4rem",backgroundColor:(themechange==='light')&&"#7b49d3"}}>
                <Toolbar variant="dense" >

                {/* App Bar */}
                <Fragment key={1} >
                <IconButton onClick={toggleDrawer("left", true)} style={{marginRight:"0.5rem",color:(themechange==='light')&&"white"}}>
                <MenuIcon/></IconButton>
               
                 {themebutton}   {/* Theme Change Button */}
                
                <Drawer style={{color:"green"}}
                 anchor="left"
                 open={state["left"]}
                 onClose={toggleDrawer("left", false)} >
                 {list("left")}
                 </Drawer>
                 </Fragment>
                  {/* Search Field */}
                 <InputBase  placeholder="Search" className="searchfield" style={{backgroundColor:(themechange==='light')&&"white"}}
                 inputProps={{ 'aria-label': 'search google maps' }} /> 
    
                 <div  className="badge">
                 <Badge id="mail" badgeContent={5} color="error">
                 <MailIcon  style={{fill:(themechange==='dark')&&"greenyellow"}} />
                 </Badge>
                 <Badge  id="notification" badgeContent={7} color="error">
                 <NotificationsIcon   style={{fill:(themechange==='dark')&&"skyblue"}}/> 
                 </Badge>
                 </div>

                  {/* Admin pic */}
                 <img alt="C" className="adminpic" src="https://static.statusqueen.com/dpimages/thumbnail/Stylish_dp-1473.jpg" />
                 <p className="admin">ADMIN</p>
                </Toolbar>
                </AppBar>
                </Box>


               {/* Body */}
               <context.Provider value={obj}>
               <Switch>
                 <Route path='/users'><Userlist/></Route>
                <Route path='/Adduser'><Adduserlist /></Route> 
                <Route exact path='/'><Redirect to='/users'/></Route>
                <Route path='/Moreinfo'>Comming Soon. . .😎</Route>
                <Route path='/Settings'>Comming Soon. . .😎</Route>
               </Switch>
               </context.Provider>
              {/* Footer */}
              <footer className="footer" style={{backgroundColor:(themechange==='light')&&"#7b49d3"}}>
              <p className="footercontent">Copyright © UserList Webpage 2021</p>
              </footer>
    
              </div>
              </Paper>
              </ThemeProvider>
  ); 
}



// Display User List
function Userlist()
{ 
  
  const {data,setData}=useContext(context)

  
  const getdata=()=>{fetch(`${URL}/userlist`,
  {method:'GET'}).then((x)=>x.json()).then((x)=>setData(x))
}   

useEffect(getdata,[setData])

// Delete User
const deleteuser=(id)=>{
  fetch(`${URL}/userlist/${id}`,{method:"DELETE"}).then((x)=>x.json()).then(()=>getdata())
}

  return(<div className="displayuserlist">
            <div className="users-heading">
            <p>Users</p>
            <p className="current-users">Current Users : {data.length}</p>
            </div>
        {/* // Table Heading */}
        <TableContainer component={Paper} id="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
        <TableRow>
        <TableCell align="center">Photo</TableCell>
        <TableCell align="center">Username</TableCell>
        <TableCell align="center">Mobile</TableCell>
        <TableCell align="center">Mail</TableCell>
        <TableCell align="center">Status</TableCell>
        <TableCell align="center">Action</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
      
        {/* Table Body */}
        {    (data.map(({Name,Avatar,Mobile,Mail,Status,id})=>{ return(
        //  Table row : Individual user data 
        <TableRow  className="userdata" key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>  
        <TableCell component="th" scope="row" align="center" >
        <img className="userpic" src={Avatar} alt={Name}></img></TableCell>
        <TableCell align="center"> <p  className="username">{Name}   </p></TableCell>
        <TableCell align="center"> <p className="userphnno">{Mobile} </p></TableCell>
        <TableCell align="center"> <p className="usermail">{Mail}    </p></TableCell>
        <TableCell align="center"> <p className="status">{Status}    </p></TableCell>
        <TableCell align="center"> <Features deleteuser={deleteuser}  id={id} /></TableCell>
        </TableRow>)}))}
        </TableBody>
        </Table> 
        </TableContainer>
        {/* Navigate Button */}
          <Fab variant="extended" id="floaticon" onClick={()=>window.scroll(-500,0)}><NavigationIcon sx={{ mr: 1 }} />Navigate</Fab>  
          </div>
          )      
     }


// User Features:EditButton,DeleteButton
function Features({deleteuser,id})
{
  // To track individual userdata
  let [count,setCount]=useState(0);
  return(
  <div>
  <Tooltip title="Edit">
  <IconButton onClick={()=>{setCount(1)}}><ModeEditIcon color="success"/></IconButton>
  </Tooltip>

  <Tooltip title="Delete">
  <IconButton onClick={()=>deleteuser(id)}>
  <DeleteIcon color="error" />
  </IconButton>
  </Tooltip>
  
  {/* Edit Userlist Component */}
  {(count===1)?<Updateuserlist id={id} setCount={setCount} />:null}
 
  
  </div>)
}


// Add New User Data
function Adduserlist()
{
  let {history} =useContext(context) 
  const[name,setName]=useState('')
  const[picurl,setPicurl]=useState('')
  const[mobilenum,setMobilenum]=useState('')
  const[mail,setMail]=useState('')
  

  // Newly Added Userdata Object
  const newuser={Name:name,Avatar:picurl,Mobile:+mobilenum,Mail:mail,Status:"Active"}

  // Add user to the database
  const adduser=(newuser)=>{
    fetch(`${URL}/userlist`,
    {method:"POST",
    body   :JSON.stringify(newuser),
  headers:{'Content-Type':'application/json'}}).then((user)=>user.json()).then(()=>history.push('/users'))
  }
  return (
         <div className="Adduserlist">

         {/* TextField */}
        <TextField  style={{width:'40rem'}} required label="Name" id="filled-basic" variant="standard"type="text"   onInput={(e)=>setName(e.target.value)}      placeholder="Enter the username" /><br/>
        <TextField  style={{width:'40rem'}} required label="Photo" id="filled-basic" variant="standard"  type="text"   onInput={(e)=>setPicurl(e.target.value)}    placeholder="Profile pic url" /><br/>
        <TextField  style={{width:'40rem'}} required label="Mobile Number" id="filled-basic" variant="standard" type="number" onInput={(e)=>setMobilenum(e.target.value)} placeholder="Enter the Mobile Number" /><br/>
        <TextField  style={{width:'40rem'}} required label="Mail" id="filled-basic" variant="standard" type="mail"   onInput={(e)=>setMail(e.target.value)}      placeholder="Enter the Mailid" /><br/>
        <br/>
        <Button  variant="contained" style={{marginRight:'4rem',marginBottom:"1rem"}}
        onClick={()=>adduser(newuser)}>Add User</Button>
        
        <Button  variant="contained" onClick={()=>history.push('/users')} style={{marginLeft:'25.5rem',marginBottom:"1rem"}}>Back</Button>
  </div>)
}


// Edit User data
function Updateuserlist({id,setCount})
{ 
  const [user,setUser]=useState(null)
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {setOpen(true);}

useEffect(()=>{
  fetch(`${URL}/userlist/${id}`,{method:'GET'}).then((x)=>x.json()).then((x)=>setUser(x))},[id])

 if(user!==null)
{   
  
  return <Updateuser user={user} open={open} handleClickOpen={handleClickOpen} setCount={setCount} id={id} />
}
 else
{
      return null
}
}



function Updateuser({open,user,id,handleClickOpen,setCount})
{
  let {setData} =useContext(context) 

  if(user)
  {
    handleClickOpen()
  }

  // Destruturing from old user data
  const{Name,Avatar,Mobile,Mail}=user
  

  const[name,setName]=useState(Name)
  const[picurl,setPicurl]=useState(Avatar)
  const[mobilenum,setMobilenum]=useState(Mobile)
  const[mail,setMail]=useState(Mail)


const updateuser=(updateduser)=>{
  fetch(`${URL}/userlist/${id}`,
  {method:"PUT",
  body:JSON.stringify(updateduser),
  headers:{'Content-Type':'Application/Json'}
}).then((x)=>x.json()).then(()=> getdata())
}

// Get data after the update
const getdata=()=>{fetch(`${URL}/userlist`,
{method:'GET'}).then((x)=>x.json()).then((x)=>setData(x))
}   



  // Updated User data Object
  const updateduser={Name:name,Avatar:picurl,Mobile:+mobilenum,Mail:mail,Status:"Active"}

  return( 
        <div className="Updateuserlist">
        {/* Popup Menu */}
        <Dialog open={open} >
        <DialogTitle>Update User</DialogTitle>

         {/* TextField */}
        <DialogContent style={{width:'30rem'}}>
        <TextField type="text"    value={name}       required  onInput={(e)=>setName(e.target.value)}       style={{width:'27rem'}}  label="Name" id="filled-basic" variant="filled"    placeholder="Enter the username" /><br/>
        <TextField type="text"    value={picurl}     required  onInput={(e)=>setPicurl(e.target.value)}     style={{width:'27rem'}}  label="Picture" id="filled-basic" variant="filled"    placeholder="Profile pic url" /><br/>
        <TextField type="number"  value={mobilenum}  required  onInput={(e)=>setMobilenum(e.target.value)}  style={{width:'27rem'}}  label="Mobile" id="filled-basic" variant="filled"    placeholder="Enter the Mobile Number" /><br/>
        <TextField type="mail"    value={mail}       required  onInput={(e)=>setMail(e.target.value)}       style={{width:'27rem'}}  label="Mail" id="filled-basic" variant="filled"    placeholder="Enter the Mailid" /><br/>
        </DialogContent>

        <DialogActions>
        <Button  variant="contained"  style={{marginRight:'5rem',marginBottom:"1rem"}}
         onClick={()=>{ updateuser(updateduser);setCount(0); }}>Save</Button>
        </DialogActions>
        
        </Dialog>
        </div>)
}



