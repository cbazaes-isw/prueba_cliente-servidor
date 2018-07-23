
var net = require("net"),
    config = require("./config.json"),
    carrier = require("carrier");

const { exec } = require('child_process');

server = net.createServer((socket) => {

    carrier.carry(socket, (command) => {
        console.log(`Solicitando la execución de: ${command}`);

        try {

            exec(command, (err, stdout, stderr) => {

                if (err) {
                    console.error(err);
                    broadcast(socket, err.message);
                    return;
                }
                if (stdout){
                    console.log(stdout);
                    broadcast(socket, stdout);
                }
    
                if (stderr) {
                    console.log(stderr);
                    broadcast(socket, stderr);
                }
    
            });
            
        } catch (error) {

            console.error(error);
            
        }
    });

    socket.on('end', () => {
        console.log(`${socket.remoteAddress} se ha desconectado`);
        broadcast(socket, 'Adios!');
    });

    socket.on('error', (err) => {
        console.error(err);
        broadcast(socket, `error: ${err.message}`);
    });

    console.log(`Aceptando conexiones de ${socket.remoteAddress} : ${socket.remotePort}...`);
    broadcast(socket, `Hola ${socket.remoteAddress}!`);

    function broadcast(socket, message){
        socket.write(message + '\n\r');
    }

});
server.listen(config.server.port);
console.log(`Escuchando conexiones en ${config.server.port}`);
