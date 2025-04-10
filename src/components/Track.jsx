import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import React, { useEffect } from "react";

function Track(){
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, you can redirect or perform actions here
          } else {
            // User is signed out
          }
        });
      
        return unsubscribe; // Clean up the listener
      }, []);
      
}

export default Track

// now lets create the login with password and email and google, this time, no confirm password, but the eye icon to show text or password type should be there