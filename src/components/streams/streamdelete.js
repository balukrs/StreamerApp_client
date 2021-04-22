import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";

import { useSelector, useDispatch } from "react-redux";
import { deleteStream, searchStream } from "../../actions";

const useStyles = makeStyles((theme) => ({
  paperstyle: {
    width: 600,
    height: 200,
    marginTop: 60,
    boxShadow: "1px 3px 20px -1px rgba(0,0,0,0.75)",
  },
  buttonStyle: {
    marginRight: 10,
  },
}));

const Streamdelete = (props) => {
  const iD = props.match.params.id;

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchStream(iD));
    // eslint-disable-next-line
  }, []);

  const stream = useSelector((state) => state.search.stream);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onSubmit = () => {
    dispatch(deleteStream(iD));
    handleClick();
  };

  const noButton = React.forwardRef((props, ref) => (
    <Link ref={ref} to="/" {...props}></Link>
  ));

  return (
    <div className="flex items-center justify-center h-80">
      <Paper className={`${classes.paperstyle} flex items-center flex-col p-6`}>
        <div>
          <h1 className="mb-6 text-2xl">
            Do you want to delete this Stream...?
          </h1>
        </div>
        <div>
          <h2 className="mb-4 text-xl">Title: {stream ? stream.title : ""}</h2>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonStyle}
            component={noButton}
          >
            NO
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              onSubmit();
            }}
          >
            Yes
          </Button>
        </div>
      </Paper>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <div>
          <h1 className="text-base text-red-500 ">
            Stream deleted sucessfully
          </h1>
        </div>
      </Snackbar>
    </div>
  );
};

export default Streamdelete;
