// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyBM1jJSxBRWH1eGZD6GDCbkY9Rc8-CLEhA',
    authDomain: 'usuarios-a17ae.firebaseapp.com',
    projectId: 'usuarios-a17ae'
  });

var db = firebase.firestore();

function Save(){

    let txtname = document.getElementById("txtname").value;
    let txtlastname = document.getElementById("txtlastname").value;     
    let txtdate = document.getElementById("txtdate").value;

    db.collection("users").add({
        first: txtname,
        last: txtlastname,
        born: txtdate
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById("txtname").value = "";
        document.getElementById("txtlastname").value = "";     
        document.getElementById("txtdate").value = "";
        
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

 } 


//Leer documentos
let tabla = document.getElementById("tabla");
db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML="";
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        tabla.innerHTML += `<tr>
            <td scope="row">${doc.id}</td>
            <td> ${doc.data().first} </td>
            <td> ${doc.data().last} </td>
            <td> ${doc.data().born} </td> 
            <td> <button onclick="Delete('${doc.id}')" class="btn btn-danger">Eliminar</button> </td> 
            <td> <button onclick="Update('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')" class="btn btn-warning">Editar</button> </td> 
        </tr>`;
    });
});


//Borrar datos
function Delete(id){
    db.collection("users").doc(id).delete().then(function() {
        // console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}


//Actualizar
function Update(id, name, lastname, born){

    document.getElementById("txtname").value = name;
    document.getElementById("txtlastname").value = lastname;
    document.getElementById("txtdate").value = born;
    let boton = document.getElementById("btn-enviar");
    boton.innerHTML = "Editar";
    boton.onclick = function(){

        let washingtonRef = db.collection("users").doc(id);
        
        name2 = document.getElementById("txtname").value;
        lastname2 = document.getElementById("txtlastname").value;
        born2 = document.getElementById("txtdate").value;

        // Set the "capital" field of the city 'DC'
        return washingtonRef.update({
            first: name2,
            last: lastname2,
            born: born2
        })
        .then(function() {
            console.log("Document successfully updated!");
            boton.innerHTML = "Guardar";
            document.getElementById("txtname").value = "";
            document.getElementById("txtlastname").value = "";     
            document.getElementById("txtdate").value = "";
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }


}