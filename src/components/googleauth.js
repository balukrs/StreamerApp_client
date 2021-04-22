import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";

import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  buttonstyle: {
    "&:focus": {
      outline: 0,
    },
  },
}));

const GoogleAuth = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const authstats = useSelector((state) => state.auth);
  const [authent, setAuthent] = useState(null);

  useEffect(() => {
    const listenChanger = (stats, auth) => {
      if (stats) {
        dispatch({ type: "SIGN_IN", payload: auth.currentUser.get().getId() });
      } else {
        dispatch({ type: "SIGN_OUT" });
      }
    };

    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init({
          clientId:
            "523504193797-0jlecsvase41n2j38mouq3pcg3fjn4q5.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          const auth = window.gapi.auth2.getAuthInstance();
          if (auth.isSignedIn.get()) {
            dispatch({
              type: "SIGN_IN",
              payload: auth.currentUser.get().getId(),
            });
          } else {
            dispatch({ type: "SIGN_OUT" });
          }
          setAuthent(auth);
          auth.isSignedIn.listen((stats) => {
            listenChanger(stats, auth);
          });
        });
    });
  }, [dispatch]);

  const onSignin = () => authent.signIn();

  const onSignout = () => authent.signOut();

  const renderfunc = () => {
    if (authstats.isSignedin === true) {
      return (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            onSignout();
          }}
          className={classes.buttonstyle}
        >
          <Icon className="mr-2 fab fa-google" fontSize="small" />
          Log out
        </Button>
      );
    } else if (authstats.isSignedin === false) {
      return (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            onSignin();
          }}
          className={classes.buttonstyle}
        >
          <Icon className="mr-2 fab fa-google" fontSize="small" />
          Log in
        </Button>
      );
    } else return null;
  };

  return <div>{renderfunc()}</div>;
};

export default GoogleAuth;
