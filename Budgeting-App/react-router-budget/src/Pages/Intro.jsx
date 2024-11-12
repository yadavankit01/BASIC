import React, { useContext, useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import person from "../assets/illustration.jpg";
import { UserContext } from "../Context/Context";
function Intro() {
  const [userName, setUserName] = useState("");
  const { userLogin } = useContext(UserContext);
  const Submit = (e) => {
    e.preventDefault();
    userLogin(userName);
  };
  return (
    <div className="intro">
      <div>
        <h1>
          Take Control of <span className="accent">Your Money</span>
        </h1>
        <p>
          Personal budgeting is the secret to financial freedom. Start your
          Journey today
        </p>
        <form action="" onSubmit={Submit}>
          <input
            type="text"
            name="userName"
            placeholder="What is your name"
            required
            aria-label="Your Name"
            autoComplete="given-name"
            onChange={(e) => setUserName(e.target.value)}
          />
          <button type="submit" className="btn btn--dark">
            <span>Create Account</span>
            <UserPlusIcon width={20} />
          </button>
        </form>
      </div>
      <img src={person} alt="person with Money" width={600} />
    </div>
  );
}

export default Intro;
