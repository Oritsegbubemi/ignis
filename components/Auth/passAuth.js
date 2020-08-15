import firebase from "firebase";

export function Register(fname, lname, email, password, cpassword){
    //setmodalState(true)
    if (fname == "" || lname == "" || email == "" || password == "" || cpassword == "") {
        //setmodalState(false)
        alert("Please complete all fields!")
    }
    else if (password != cpassword ) {
        //setmodalState(false)
        alert("Both passwords do not match!")
    }
    else {
        firebase.auth().createUserWithEmailAndPassword(email.toLowerCase(), password).then(function(result){
            // console.log("User signed up!")
            firebase
                .database()
                .ref('/users/' + result.user.uid)
                .set({
                    email: email.toLowerCase(),
                    first_name: fname,
                    last_name: lname,
                    everify: result.user.emailVerified,
                    date_created: Date.now()
                })
        })
        .catch(function(error) {
            //setmodalState(false)
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
            // ...
            
        });
    }
}

export function Login(email,password){
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(result){
        console.log("User signed in!")
        firebase
            .database()
            .ref('/users/' + result.user.uid).update({
                everify: result.user.emailVerified,
                last_logged_in: Date.now()
            })
    })
    
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
    });
    
}

export function ResetPassword(email){
    if(email == ""){
        alert("Please fill in your email address!")
    }
    else{
        var auth = firebase.auth();
        auth.sendPasswordResetEmail(email).then(function() {
        // Email sent.
        alert("A password reset email has been sent to "+ email)
        }).catch(function(error) {
        // An error happened.
            alert(error)
        });
    }
}
