import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Avatar } from '@mui/material';
import { useUserAuth } from '../context/UserAuthContext';
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { numberWithCommas } from "./CoinsTable";
import "./usersidebar.css";






export default function UserSidebar() {
    const [state, setState] = React.useState({
      right: false,
    });
    const { user, setAlert, watchlist, coins} = useUserAuth();
  
    console.log(watchlist, coins);
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };
  
    const logOut = () => {
      signOut(auth);
      setAlert({
        open: true,
        type: "success",
        message: "Logout Successful!",
      });
  
      toggleDrawer();
    };
  
    const removeFromWatchlist = async (coin) => {
      const coinRef = doc(db, "watchlist", user.uid);
      try {
        await setDoc(
          coinRef,
          { coins: watchlist.filter((wish) => wish !== coin?.id) },
          { merge: true }
        );
  
        setAlert({
          open: true,
          message: `${coin.name} Removed from the Watchlist!`,
          type: "success",
        });
      } catch (error) {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
      }
    };
  
    return (
      <div>
        {["right"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Avatar
              onClick={toggleDrawer(anchor, true)}
              className="avatar"
              src={user.photoURL}
              alt={user.displayName || user.email}
            />
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              <div className="container">
                <div className="profile">
                  <Avatar
                    className="picture"
                    src={user.photoURL}
                    alt={user.displayName || user.email}
                  />
                  <span className="user-info">
                    {user.displayName || user.email}
                  </span>
                  <div className="watchlist">
                    <span className="watchlist-title">Watchlist</span>
                    {coins.map((coin) => {
                      if (watchlist.includes(coin.id))
                        return (
                          <div className="coin" key={coin.id}>
                            <span>{coin.name}</span>
                            <span className="coin-info">
                              {"$ "}
                              {numberWithCommas(coin.current_price.toFixed(2))}
                              <AiFillDelete
                                className="delete-icon"
                                onClick={() => removeFromWatchlist(coin)}
                              />
                            </span>
                          </div>
                        );
                      else return <React.Fragment key={coin.id} />;
                    })}
                  </div>
                </div>
                <Button
                  variant="contained"
                  className="logout"
                  onClick={logOut}
                >
                  Log Out
                </Button>
              </div>
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    );
  }









// export default function UserSidebar() {
//     const { user } = useUserAuth();
//     // console.log("user", user);
//   const [state, setState] = React.useState({
//     right: false,
//   });

//   const toggleDrawer =
//     (anchor, open) =>
//     (event) => {
//       if (
//         event.type === 'keydown' &&
//         (event.key === 'Tab' ||
//           event.key === 'Shift')
//       ) {
//         return;
//       }

//       setState({ ...state, [anchor]: open });
//     };

  

//   return (
//     <div>
//       {['right'].map((anchor) => (
//         <React.Fragment key={anchor}>
//         <Avatar
//             onClick={toggleDrawer(anchor, true)}
//             style={{
//               height: 38,
//               width: 38,
//               marginLeft: 15,
//               cursor: "pointer",
//               backgroundColor: "#EEBC1D",
//             }}
//              src={user&user.photoURL}
//              alt={user&(user.displayName || user.email)}
//           />
//           <Drawer
//             anchor={anchor}
//             open={state[anchor]}
//             onClose={toggleDrawer(anchor, false)}
//           >
        
//           </Drawer>
//         </React.Fragment>
//       ))}
//     </div>
//   );
// }