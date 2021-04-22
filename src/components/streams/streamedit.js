import React, { useState, useRef, useEffect } from "react";
import { useForm, useField } from "react-final-form-hooks";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";

import { connect, useDispatch } from "react-redux";
import { editStream, searchStream } from "../../actions";

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

const Streamedit = (props) => {
  const dispatch = useDispatch();
  const iD = props.match.params.id;

  const classes = useStyles();
  const resetel = useRef(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(searchStream(iD));
    // eslint-disable-next-line
  }, []);

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
    dispatch(editStream(values, iD));
    resetel.current.click();
    handleClick();
  };
  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Required";
    }
    if (!values.description) {
      errors.description = "Required";
    }
    return errors;
  };

  const Create = () => {
    const { form, handleSubmit } = useForm({
      onSubmit,
      validate,
      initialValues: {
        title: props.userdata ? props.userdata.title : "",
        description: props.userdata ? props.userdata.description : "",
      },
      keepDirtyOnReinitialize: true,
    });

    const title = useField("title", form);
    const description = useField("description", form);

    return (
      <div className="w-8/12 p-6 mt-5">
        <div>
          <h1 className="text-4xl ">Edit Stream</h1>
        </div>
        <div className="w-8/12 mt-6 mb-5 h-3/5">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <TextField
                {...title.input}
                id="standard-basic"
                label="Title"
                fullWidth={true}
                className={classes.inputstyle}
              />
              {title.meta.error && title.meta.touched && (
                <span className="text-xs text-red-600">{title.meta.error}</span>
              )}
            </div>

            <div className="mb-6">
              <TextField
                {...description.input}
                multiline
                id="standard-multiline-flexible"
                rowsMax={4}
                label="Description"
                fullWidth={true}
                className={classes.inputstyle}
              />
              {description.meta.error && description.meta.touched && (
                <span className="text-xs text-red-600">
                  {description.meta.error}
                </span>
              )}
            </div>

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
        </div>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <div>
            <h1 className="text-base text-red-500 ">
              Stream edited sucessfully
            </h1>
          </div>
        </Snackbar>
      </div>
    );
  };

  return <Create />;
};

const mapStateToProps = (state) => {
  return { signed: state.auth.isSignedin, userdata: state.search.stream };
};

export default connect(mapStateToProps, { editStream })(Streamedit);
