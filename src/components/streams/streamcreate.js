import React, { useState, useRef } from "react";
import { Form, Field } from "react-final-form";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";

import { connect, useDispatch, useSelector } from "react-redux";
import { createStream } from "../../actions";

import Loginreq from "../loginrequest";

const useStyles = makeStyles((theme) => ({
  inputstyle: {
    display: "block",
  },
  buttonstyle: {
    "&:focus": {
      outline: 0,
    },
    marginRight: 10,
  },
  buttonstyle2: {
    "&:focus": {
      outline: 0,
    },
  },
}));

const Streamcreate = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const resetel = useRef(null);
  const loginstats = useSelector((state) => state.auth);

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

  const onSubmit = (values) => {
    values = { ...values, userid: loginstats.userId };
    dispatch(createStream(values));
    resetel.current.click();
    handleClick();
  };

  const Create = () => {
    return (
      <div className="w-8/12 p-6 mt-5">
        <div>
          <h1 className="text-4xl ">Create new Stream</h1>
        </div>
        <div className="w-8/12 mt-6 mb-5 h-3/5">
          <Form
            onSubmit={onSubmit}
            validate={(values) => {
              const errors = {};
              if (!values.title) {
                errors.title = "Required";
              }
              if (!values.description) {
                errors.description = "Required";
              }
              return errors;
            }}
            render={({ handleSubmit, form }) => (
              <form onSubmit={handleSubmit}>
                <Field name="title">
                  {({ input, meta }) => (
                    <div className="mb-3">
                      <TextField
                        {...input}
                        id="standard-basic"
                        label="Title"
                        fullWidth={true}
                        className={classes.inputstyle}
                      />
                      {meta.error && meta.touched && (
                        <span className="text-xs text-red-600">
                          {meta.error}
                        </span>
                      )}
                    </div>
                  )}
                </Field>
                <Field name="description">
                  {({ input, meta }) => (
                    <div className="mb-6">
                      <TextField
                        {...input}
                        multiline
                        id="standard-multiline-flexible"
                        rowsMax={4}
                        label="Description"
                        fullWidth={true}
                        className={classes.inputstyle}
                      />
                      {meta.error && meta.touched && (
                        <span className="text-xs text-red-600">
                          {meta.error}
                        </span>
                      )}
                    </div>
                  )}
                </Field>

                <div className="buttons">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.buttonstyle}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={form.restart}
                    className={classes.buttonstyle2}
                    ref={resetel}
                  >
                    Reset
                  </Button>
                </div>
              </form>
            )}
          />
        </div>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <div>
            <h1 className="text-base text-red-500 ">
              Stream added sucessfully
            </h1>
          </div>
        </Snackbar>
      </div>
    );
  };

  return props.signed === true ? <Create /> : <Loginreq />;
};

const mapStateToProps = (state) => {
  return { signed: state.auth.isSignedin };
};

export default connect(mapStateToProps, { createStream })(Streamcreate);
