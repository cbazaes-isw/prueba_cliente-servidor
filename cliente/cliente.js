var net = require("net");

var client = new net.Socket();
client.connect(8000, "127.0.0.1", () => {
	console.log("Conectado...");
	client.write("e:\Documentos\Defontana.GIT\Main\1_ERP\desregistrador64.bat");
});

client.on("data", (data) => {
	console.log("Received: " + data);
	client.destroy(); // kill client after server's response
});

client.on("close", function() {
	console.log("Connection closed");
});

