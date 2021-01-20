# TrabajoSiBi-MyTeam

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas
La memoria está subida tanto en pdf como en word ya que al convertirlo a pdf me dio algún fallo y no es visible de la misma manera.
Pre-requisitos📋
Qué cosas necesitas para instalar el software y como instalarlas
Visual Studio Code, Sublime Text, etc. Cualquier editor de texto.
Instalación🔧
Descargar en formato ZIP el archivo Take My Movie del Github (y extraerlo) donde se podrán encontrar los diferentes archivos
/public, /views, /app.js, /package-lock.json, /package.json
https://nodejs.org/es/ Dirigirse a esta página y descargar el Nodejs.
Después habrá que seguir estas instrucciones:https://bertofern.wordpress.com/2019/01/08/solucion-node-js-npm-no-reconocido-como-comando-interno-o-externo/, son 10 pasos simples. Finalmente ya podrá proseguir y utilizar el comando "npm install"
Arrancar una terminal cmd, posicionarse en el directorio donde se encuentre la carpeta anteriormente descargada y utilizar este comando
npm install
Si todo ha ido bien, se nos creará una carpeta dentro del propio folder "MyTeam" que se llame "node_modules".
Después ejecutar estos comandos en el mismo directorio /MyTeam
npm install express
npm install neo4j-driver
npm install ejs
Esto nos permitirá utilizar el Nodejs para hacer funcionar la página web.
Lo siguiente que habría que hacer es dirigirse a https://sandbox.neo4j.com/ y crear un nuevo proyecto donde vamos a insertar todos los datos de mis .csv Al crear la sandbox, insertaremos paso por paso todos los comandos que se encuentran en el archivo.Pasos a seguir Neo4j Sandbox en mi Github

Para conseguir los detalles de conexión de la base de datos creada en la sandbox, nos fijamos en estos datos: 


Estos datos los necesitaremos a continuación. Pasos a seguir:
    • Abrir el archivo app.js con un editor de texto
    • Cambiar el bolt://… por nuestra Bolt URL bolt://… que aparezca en nuestra sandbox.
    • Lo mismo con el Username y con la Password
      
Cuando ya tengamos esto, lo siguiente será comprobar el funcionamiento de la página web. Para ello nos dirigimos a la terminal cmd, situados en el directorio de la carpeta MyTeam donde hemos realizado el npm install y escribimos el siguiente comando: 

node.app.js

Si todo funciona bien, nos debería aparecer lo siguiente. 



Después de esto ya podremos poner en nuestro buscador del navegador localhost:3000 y visionar la página web con la base de datos enlazada. 

Autores ✒️
    • Miguel Prieto Castellanos - Proyecto al completo
