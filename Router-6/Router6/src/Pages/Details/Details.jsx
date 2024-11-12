import React, { useEffect } from "react";
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import { useParams } from "react-router-dom";
import { List as DummyData } from "../List/data";

import "./style.css";
function Details() {
 
  const param = useParams();
  const [SearchParam, setSearchParam] = useSearchParams();
  const data = DummyData.find(
    (item) => item.id === parseInt(param.movieId, 10)
  );
  const navigate = useNavigate();
  // const outletData = useOutletContext();
  // console.log("ID", data.id);
  const HandalGoback = () => {
    navigate("/");
  };
  return (
    <>
      <div>
        <button onClick={HandalGoback}>Go Back</button>
      </div>
      <div className="Main-c">
        <div className="list-card">
          <div className="img-c">
            <img src={data.thumbnail} height="100%" width={"100%"} />
          </div>

          <div className="details">
            <h4>ID:{data.id}</h4>
            <h4>Title: {data?.title}</h4>
            <h4>Year: {data?.year}</h4>
            <h4>Detail: {data?.extract}</h4>
            <h4>Genres: {data?.genres?.split?.("")}</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
