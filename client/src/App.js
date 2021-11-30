import React, { useState, useEffect } from "react";
// import gmailApi from "react-gmail";
import { gapi } from "gapi-script";
import Dashboard from "./components/Dashboard";
import apiClient from "./apliClient";

const App = () => {
  const client = new apiClient();
  const [messages, setMessages] = useState([]);
  // const [profile, setProfile] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    var CLIENT_ID =
      "250089927544-l604497jqg597fturj6c5o03hkfaljmm.apps.googleusercontent.com";
    var API_KEY = "AIzaSyAFZw5BZQS_sPn22lptP7EBvYRVKwXvks4";

    // Array of API discovery doc URLs for APIs used by the quickstart
    var DISCOVERY_DOCS = [
      "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest",
    ];

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    var SCOPES = "https://www.googleapis.com/auth/gmail.readonly";

    // var authorizeButton = document.getElementById("authorize_button");
    // var signoutButton = document.getElementById("signout_button");
    function handleClientLoad() {
      gapi.load("client:auth2", initClient);
    }
    /**
     *  Initializes the API client library and sets up sign-in state
     *  listeners.
     */
    // function handleAuthClick(event) {
    //   gapi.auth2.getAuthInstance().signIn();
    // }

    /**
     *  Sign out the user upon button click.
     */
    // function handleSignoutClick(event) {
    //   gapi.auth2.getAuthInstance().signOut();
    //   setMessages([]);
    // }
    function initClient() {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(
          function () {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(true);

            // Handle the initial sign-in state.

            // authorizeButton.onclick = handleAuthClick;
            // signoutButton.onclick = handleSignoutClick;
            setLoaded(true);
          },
          function (error) {
            console.log(error);
            // appendPre(JSON.stringify(error, null, 2));
          }
        );
    }
    handleClientLoad();
  }, []);

  const get = () => {
    let emails = window.localStorage.getItem("emails");
    emails = JSON.parse(emails);
    setMessages(emails);
    return;
    // gmailApi.getMessages(true, 50).then((res) => {
    //   console.log(res);
    //   setMessages(gmailApi.normalizeData(res));

    //   window.localStorage.setItem(
    //     "emails",
    //     JSON.stringify(gmailApi.normalizeData(res))
    //   );
    // });
  };
  useEffect(() => {
    if (!loaded) {
      return;
    }
    // login problems?? bring this back
    // gapi.auth2.getAuthInstance().signIn();
    get();
  }, [loaded]);

  // useEffect(() => {
  //   get();
  // }, []);

  return (
    <div className="appContainer">
      {/* <button onClick={() => get()}>Get Messages</button> */}
      <Dashboard messages={messages} client={client}></Dashboard>
      {/* <ul>
        {messages.map((message, k) => (
          <li key="message.id" key={k}>
            <div>
              <span>
                {message.subject}: {message.snippet}
              </span>
              <p>{message.date}</p>
            </div>
          </li>
        ))}
      </ul> */}
    </div>
  );
};
export default App;
