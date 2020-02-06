import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { CLIENT_ID } from "./constants.js";
import { data } from "./data.js";
import "./styles.scss";
import AddOrder from "./AddOrder.jsx";
import { connect } from "react-redux";
import {
  initOrders,
  addOrder,
  setLocalOrders,
  deleteOrder,
  setGid,
  clearLocalStorage
} from "./Redux/orderActions";
import Order from "./Order.jsx";
function Homepage({
  initOrders,
  addOrder,
  datas,
  setLocalOrders,
  deleteOrder,
  setGid,
  clearLocalStorage,
  gid
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loggedin, setLoggedIn] = useState(false);
  const [orders, setOrders] = useState(data);
  const shuffle = array => {
    let m = array.length,
      t,
      i;

    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  };

  const responseGoogle = res => {
    if (!res.error) {
      console.log(res);
      setGid(res.googleId);
      setName(res.profileObj.name);
      setEmail(res.profileObj.email);
      setAvatar(res.profileObj.imageUrl);
      setLoggedIn(true);
    }
  };
  useEffect(() => {
    if (!localStorage.getItem(`${gid}`)) {
      initOrders(shuffle(data));
    } else {
      initOrders(JSON.parse(localStorage.getItem(`${gid}`)));
    }
    setLocalOrders();
  }, [gid]);

  const handleDelete = idx => {
    deleteOrder(idx);
    setLocalOrders();
  };

  return (
    <div className="big-container">
      {!loggedin && (
        <div className="utc">
          <p>You're not logged in!</p>
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      )}
      {loggedin && (
        <div>
          <div className="userprofile">
            <div className="useravatar">
              <img src={avatar} alt="avatar" />
            </div>
            <div className="userdeets">
              <p>Logged in as - {name}</p>
              <p>Email - {email}</p>
            </div>
            <div className="btn-div">
              <GoogleLogin
                clientId={CLIENT_ID}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              >
                Change User
              </GoogleLogin>
              <button
                className="delete"
                onClick={() => {
                  clearLocalStorage();
                }}
              >
                Clear LocalStorage
              </button>
            </div>
          </div>
          <AddOrder />
          <ul className="order-ul">
            {datas !== [] &&
              datas.map((or, idx) => {
                return (
                  <Order
                    order={or}
                    index={idx}
                    key={or.id}
                    handleDelete={() => handleDelete(idx)}
                  />
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
}
const mapStateToProps = state => {
  return { datas: state.orders.orders, gid: state.orders.gid };
};
export default connect(mapStateToProps, {
  initOrders,
  addOrder,
  setLocalOrders,
  deleteOrder,
  setGid,
  clearLocalStorage
})(Homepage);
