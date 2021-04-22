import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { streamData } from "../../actions";

import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  createButton: {
    marginTop: 10,
    marginRight: 12,
  },
}));

const Streamlist = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const streams = useSelector((state) => state.streams[0]);
  const user = useSelector((state) => state.auth.userId);

  const editButton = React.forwardRef((props, ref) => (
    <Link ref={ref} to={`/streams/edit/${props.extra._id}`} {...props}></Link>
  ));
  const deleteButton = React.forwardRef((props, ref) => (
    <Link ref={ref} to={`/streams/delete/${props.extra._id}`} {...props}></Link>
  ));
  const createButton = React.forwardRef((props, ref) => (
    <Link ref={ref} to="/streams/new" {...props}></Link>
  ));

  useEffect(() => {
    dispatch(streamData());
  }, [dispatch]);

  const Useradmin = (item) => {
    if (item.userid === user) {
      return (
        <div className="flex">
          <div className="mr-3">
            <Button variant="contained" component={editButton} extra={item}>
              Edit
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              component={deleteButton}
              color="secondary"
              extra={item}
            >
              Delete
            </Button>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  const List = () => {
    if (streams) {
      return streams.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between w-9/12 p-4 m-auto shadow"
        >
          <Link to={`/streams/${item._id}`}>
            <div className="flex items-center">
              <div className="mr-3 ">
                <VideoLibraryIcon />
              </div>
              <div>
                <div>
                  <h2 className="text-base font-bold text-blue-500">
                    {item.title}
                  </h2>
                </div>
                <div>
                  <h4 className="font-normal ">{item.description}</h4>
                </div>
              </div>
            </div>
          </Link>
          <div className="ml-64">{Useradmin(item)}</div>
        </div>
      ));
    }
    return null;
  };

  const create = () => {
    return (
      <Button
        variant="contained"
        color="primary"
        component={createButton}
        className={classes.createButton}
      >
        Create Stream
      </Button>
    );
  };

  return (
    <div className="p-4">
      <div className="w-full">
        <div>{List()}</div>
        <div className="flex items-center justify-end w-9/12 m-auto">
          {create()}
        </div>
      </div>
    </div>
  );
};

export default Streamlist;
