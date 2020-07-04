function Register(){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){
        Verified();
    }).catch(function(error){
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
}

function Login (){
    let emailLogin = document.getElementById("email-login").value;
    let passwordLogin = document.getElementById("password-login").value;
    firebase.auth().signInWithEmailAndPassword(emailLogin, passwordLogin).catch(function(error){
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
}

function Observer(){
    firebase.auth().onAuthStateChanged(function(user){
        let btnSesion = document.getElementById("register-user");
        let dataUser = document.getElementById("data-user");
        if(user){
            //User is signet in.
            let displayName = user.displayName;
            let email = user.email;
            let emailVerified = user.emailVerified;
            console.log("*****************");
            console.log(emailVerified);
            let photoUrl=user.photoUrl;
            let isAnonymous = user.isAnonymous;
            let uid = user.uid;
            let provirData = user.provirData;

            console.log("Existe un usuario activo");
            userActive(user);
            dataUser.innerHTML = `<div class="row justify-content-center">
                                    <div class="col-lg-6">
                                        <div  class="alert alert-success" role="alert">
                                            <div id="user-name">
                                                <span>Nombre:${user.email}</span>
                                            </div>
                                            <div id="user-email">
                                                <span>Verificación de email: ${user.emailVerified}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
        }else{
            //User is signed out.
            console.log('No hay usuario activo');
            btnSesion.innerHTML = `<button class="btn btn-secondary btn-block my-2 my-sm-0 mt-3" data-toggle="modal" data-target="#exampleModal">Registrarse</button>`;
            document.getElementById("user-active").innerText="Ingrese sus datos de usuario";
            dataUser.innerHTML = "";
        }
    });
}
function userActive(user){
    let userVerified = user;
    let userActive = document.getElementById("user-active");
    let btnSesion = document.getElementById("register-user");

    if(userVerified.emailVerified){
        userActive.innerText  = `Bienvenido!!`;
    }else{
        userActive.innerText = `Verificar correo electrónico`;
    }
    btnSesion.innerHTML = `<button class="btn btn-danger btn-block my-2 my-sm-0 mt-3" onclick="signOut()">Cerrar Sesión</button>`;

}

function signOut(){
    firebase.auth().signOut()
    .then(function(){
        console.log("saliendo")
    }).catch(function(error){
        console.log(error);
    });
}

function Verified(){
    let user = firebase.auth().currentUser;
    user.sendEmailVerification()
    .then(function(){
        console.log("Enviando correo");
    }).catch(function(error){
        console.log(error);
    });
}

Observer();