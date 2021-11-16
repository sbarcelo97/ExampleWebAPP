# ExampleWebAPP
An Example web APP and API for the subject Taller de Programacion Web
Members : Sofia Barcelo, Agustina Behotas 

# File Details
* Routes: compras_api/routes/compras.js
* Model and controller: compras_api/model/Compras.js
* App: compras_api/app.js

#To run the nodejs server in port 3000
*make sure mongodb is running
*go to comprasapi folder
*npm start

#To run the angular app in port 4000
*go to frontend folder
*ng serve

# Commands to test
In app.js file configure the mongo connection
  # POST 
  * curl -i -X POST -H "Content-Type: application/json" -d '{ "nroCompra":1,"productos":[{"codigo":0, "monto":50.00}, {"codigo":123, "monto":200.00},{"codigo":222, "monto":150.00}],"montoTotal": 0, "formaDePago" : "ef" }' localhost:3000/compras
  
  # GET ALL / GET ONE BY NROCOMPRA / GET BY FORMADEPAGO
  * curl -i -H "Accept: application/json" localhost:3000/compras"
  * curl -i -H "Accept: application/json" localhost:3000/compras/1"
  * curl -i -H "Accept: application/json" localhost:3000/compras/fdp/"efectivo"
  
  # UPDATE OR DELETE
  * curl -i -X PUT -H "Content-Type: application/json" -d '{ "formaDePago":"efectivo"}' localhost:3000/compras/1
  * curl -i -X DELETE localhost:3000/compras/1
