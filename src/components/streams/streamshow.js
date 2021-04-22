import React, { useEffect } from "react";
import { searchStream } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const Streamshow = (props) => {
  const userid = props.match.params.id;
  const dispatch = useDispatch();
  const { stream } = useSelector((state) => state.search);
  useEffect(() => {
    dispatch(searchStream(userid));
    // eslint-disable-next-line
  }, []);
  return (
    <div className="p-4 ">
      <div className="ml-2 ">
        <div>
          <h1 className="mb-4 text-5xl font-bold">
            {stream ? stream.title : ""}
          </h1>
        </div>
        <div className="mb-2">
          <h1 className="text-2xl font-light">
            {stream ? stream.description : ""}
          </h1>
        </div>
        <div>
          <iframe
            title="Youtube"
            width={"900"}
            height={"500"}
            src="https://www.youtube.com/embed/tgbNymZ7vqY"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Streamshow;
