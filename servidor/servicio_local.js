var net = require("net"),
    config = require("./config.json");

server = net.createServer((socket) => {
    var remoteAddress = socket.remoteAddress;

    var chunks = [];
    socket.on('data', (data) => {
        console.log(`Recibiendo datos desde ${remoteAddress}...`);
        chunks.push(data);
    });

    socket.on('end', () => {
        var body = Buffer.concat(chunks).toString();

        console.log(`${remoteAddress} dice: ${body}`);


    });

    // e:\Documentos\Defontana.GIT\Main\1_ERP\desregistrador64.bat

    console.log(`Aceptando conexiones desde ${remoteAddress}...`);
    socket.write(`Hola ${remoteAddress}!\n`);

});
server.listen(config.server.port);
