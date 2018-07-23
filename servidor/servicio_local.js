
var net = require("net"),
    config = require("./config.json"),
    carrier = require("carrier");

server = net.createServer((socket) => {

    carrier.carry(socket, (cmd_line) => {
        if (!cmd_line) return;

        console.log(`Solicitando la execución de: ${cmd_line}`);

        var commands = cmd_line.split(" ");
        var command = commands[0];
        var args = (commands.length > 1 ? commands.slice(1, commands.length) : []);

        try {

            var launcherErp = require('child_process').spawn(command, args);

            launcherErp.stdout.on('data', (data) => {
                console.log(data.toString());
                broadcast(socket, data.toString());
            });

            launcherErp.stderr.on('data', (data) => {
                console.error(data.toString());                
                broadcast(socket, data.toString());
            });

            launcherErp.on('exit', (code) => {
                console.log(`child process exited with code ${code}`);
                broadcast(socket, `child process exited with code ${code}`);
            });

            launcherErp.on('error', (err) => {
                console.error(err);
                broadcast(socket, err.message);
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
