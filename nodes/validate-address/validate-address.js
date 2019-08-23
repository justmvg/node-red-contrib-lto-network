var request = require('request');
var request = request.defaults({ jar: true })
var defaultAPI = "https://nodes.lto.network";

module.exports = function (RED) {
    
    function ValidateLTOAddress(config) {
    RED.nodes.createNode(this, config);

    var node = this;
    node.on('input', function (msg) {

        if (typeof config.endpoint === "undefined" || config.endpoint == "") {
            config.endpoint = defaultAPI;
        }
        
        if (typeof config.address === "undefined") {
            msg.payload = 'No LTO Wallet Address configured.';
            this.status({ fill: "red", shape: "dot", text: msg.payload });
            node.send(msg);
        } else {
            var ltoEndpoint = config.endpoint;
            var ltoAddress = config.address;

                if (typeof msg.payload.address !== "undefined" && msg.payload.address != "") {
                    ltoAddress = msg.payload.address;
                }
                if (ltoAddress == null) {
                    msg.payload = 'LTO Wallet Address is empty.';
                    this.status({ fill: "red", shape: "dot", text: msg.payload });
                    node.send(msg);
                }
                var endpoint = ltoEndpoint + '/addresses/validate/' + ltoAddress

                request.get(endpoint, (err, response, body) => {
                    if (err) {
                        return console.error('Failed:', err);
                    }
                    var body2json = JSON.parse(body);
                    if (typeof body2json.error === "undefined") {
                        this.status({ fill: "green", shape: "dot", text: endpoint });
                    } else {
                        this.status({ fill: "red", shape: "dot", text: endpoint });
                    }
                    msg.payload = body2json;
                    node.send(msg);
                });
            
        }
    });
}
RED.nodes.registerType("Validate LTO Address", ValidateLTOAddress);
}