import React from "react";
import { List as DummyData } from "./data";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import "./style.css";
// import { Outlet } from "react-router-dom";
function List() {
  useEffect(() => {
    const text = searchParems.get("search") || "";
    inputref.current.value = text;
  }, []);
  const [searchParems, setsearchParems] = useSearchParams();

  const inputref = useRef();
  const handalserch = () => {
    setsearchParems({ search: inputref.current.value });
  };
  const text = searchParems.get("search") || "";
  const DataList = DummyData.filter((x) =>
    x.title.toLowerCase().includes(text.toLowerCase())
  );
  // console.log("Da", DataList);
  return (
    <div>
      {/* <Outlet context={"This data is from list component"} /> */}
      <h2>List</h2>
      <div className="search-container">
        <input type="text" ref={inputref} />
        <button onClick={handalserch}>Search</button>
      </div>
      <div className="list">
        {DataList.map((item, i) => {
          return (
            <Link to={`/Details/${item.id}`} className="card" key={i}>
              <span>{item.title}</span>
              <span>{item.id}</span>
              <img src={item.thumbnail} height="140px" width={"120px"} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default List;
