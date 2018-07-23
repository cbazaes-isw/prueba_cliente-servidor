var spawn = require("child_process"),
    net = require("net"),
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

        const child = spawn(body);
        child.stdout.setEncoding("utf8");
        child.stdout.on("data", (chunk) => {
            console.log(chunks);
        });

        console.log(`${remoteAddress} dice: ${body}`);


    });

    // e:\Documentos\Defontana.GIT\Main\1_ERP\desregistrador64.bat

    console.log(`Aceptando conexiones desde ${remoteAddress}...`);
    socket.write(`Hola ${remoteAddress}!\n`);

});
server.listen(config.server.port);
