import React, { useEffect, useState, lazy, Suspense } from "react";
import axios from "axios";
import CreateModal from "./CreateModal";
import UpdateModal from "./UpdateModal";
import ViewModal from "./ViewModal";
import "./Datatable.css";

// const ViewModal = lazy(() => {
//   return import("./ViewModal");
// });

function Datatable() {
  const [modal, setmodal] = useState(false);
  const [modal2, setmodal2] = useState(false);
  const [modal3, setmodal3] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null); // State to hold selected user ID
  const [users, setusers] = useState([]);
  const [con, setcon] = useState(false);
  const handelmodal = () => {
    setmodal(true);
    setcon(true);
  };

  const handelmodal2 = (userId) => {
    setSelectedUserId(userId); // Set selected user ID
    setmodal2(true);
  };

  const handelmodal3 = (userId) => {
    setSelectedUserId(userId);
    console.log("UserId", userId);
    setmodal3(true);
  };

  const hidemodal = () => {
    setmodal(false);
  };

  const hidemodal2 = () => {
    setSelectedUserId(null); // Clear selected user ID
    setmodal2(false);
  };

  const hidemodal3 = () => {
    setSelectedUserId(null);
    setmodal3(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const result = await axios.get("http://localhost:3004/users");
      if (result.status === 200) {
        setusers(result.data.reverse());
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const deleteuser = async (userId) => {
    try {
      const res = await axios.delete(`http://localhost:3004/users/${userId}`);
      if (res.status === 200) {
        loadUsers();
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  return (
    <>
      <div className="container">
        <div className="p-4">
          <h1 className="text-center text-primary">Users Data</h1>
          {!users.length ? (
            <div className="no-data-message text-center">
              No data found{" "}
              <button onClick={handelmodal} className="btn btn-primary btn-sm">
                Add user
              </button>
            </div>
          ) : (
            <div className="table-responsive my-3">
              <div className="add-user-btn">
                <button
                  onClick={handelmodal}
                  className="btn btn-primary btn-sm"
                >
                  Add user
                </button>
              </div>
              <table className="table border shadow">
                <thead className="table-dark">
                  <tr>
                    <th scope="col" style={{ width: "5%" }}>
                      #
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      Name
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      Username
                    </th>
                    <th scope="col" style={{ width: "20%" }}>
                      Email
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      Contact
                    </th>
                    <th scope="col" style={{ width: "30%" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <button
                            onClick={() => handelmodal3(user.id)}
                            className="btn btn-primary btn-sm me-2"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handelmodal2(user.id)}
                            className="btn btn-outline-primary btn-sm me-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteuser(user.id)}
                            className="btn btn-danger btn-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <CreateModal state={modal} fun={hidemodal} loadUsers={loadUsers} />
      <UpdateModal
        state={modal2}
        fun={hidemodal2}
        userId={selectedUserId}
        loadUsers={loadUsers}
      />

      <ViewModal state={modal3} fun={hidemodal3} userId={selectedUserId} />
      {/* lazy loading and coad spliting */}
      {/* {con && (
        <Suspense>
          <ViewModal state={modal3} fun={hidemodal3} userId={selectedUserId} />
        </Suspense>
      )} */}
    </>
  );
}

export default Datatable;
