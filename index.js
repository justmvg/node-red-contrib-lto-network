var request = require('request');
var request = request.defaults({ jar: true })


module.exports = function (RED) {
    var defaultAPI = "https://nodes.lto.network";
    
    function GetWalletBalance(config) {
        RED.nodes.createNode(this, config);

        var node = this;
        node.on('input', function (msg) {

            if (typeof config.endpoint === "undefined") {
                msg.payload = 'No API endpoint configured.';
                this.status({ fill: "red", shape: "dot", text: msg.payload });
                node.send(msg);
            } else if (typeof config.address === "undefined") {
                msg.payload = 'No LTO Wallet Address configured.';
                this.status({ fill: "red", shape: "dot", text: msg.payload });
                node.send(msg);
            } else {
                var ltoEndpoint = config.endpoint;
                var ltoAddress = config.address;

                if (ltoEndpoint == "") {
                    msg.payload = 'Empty API endpoint.';
                    this.status({ fill: "red", shape: "dot", text: msg.payload });
                    node.send(msg);
                } else {
                    if (typeof msg.payload.address !== "undefined" && msg.payload.address != "") {
                        ltoAddress = msg.payload.address;
                    }
                    if (ltoAddress == null) {
                        msg.payload = 'LTO Wallet Address is empty.';
                        this.status({ fill: "red", shape: "dot", text: msg.payload });
                        node.send(msg);
                    }
                    var endpoint = ltoEndpoint + '/addresses/balance/details/' + ltoAddress

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
            }
        });
    }
    RED.nodes.registerType("Get balance", GetWalletBalance);

    function GetActiveLeases(config) {
        RED.nodes.createNode(this, config);

        var node = this;
        node.on('input', function (msg) {

            if (typeof config.endpoint === "undefined") {
                //msg.payload = 'No API endpoint configured. Fallback to default.';
                this.status({ fill: "red", shape: "dot", text: "Default LTO API" });
                //node.send(msg);
                config.endpoint = defaultAPI;
            }
            
            if (typeof config.address === "undefined") {
                msg.payload = 'No LTO Wallet Address configured.';
                this.status({ fill: "red", shape: "dot", text: msg.payload });
                node.send(msg);
            } else {
                var ltoEndpoint = config.endpoint;
                var ltoAddress = config.address;

                if (ltoEndpoint == "") {
                    msg.payload = 'Empty API endpoint.';
                    this.status({ fill: "red", shape: "dot", text: msg.payload });
                    node.send(msg);
                } else {
                    if (typeof msg.payload.address !== "undefined" && msg.payload.address != "") {
                        ltoAddress = msg.payload.address;
                    }
                    if (ltoAddress == null) {
                        msg.payload = 'LTO Wallet Address is empty.';
                        this.status({ fill: "red", shape: "dot", text: msg.payload });
                        node.send(msg);
                    }
                    var endpoint = ltoEndpoint + '/leasing/active/' + ltoAddress

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
            }
        });
    }
    RED.nodes.registerType("Get active leases", GetActiveLeases);

    function ValidateLTOAddress(config) {
        RED.nodes.createNode(this, config);

        var node = this;
        node.on('input', function (msg) {

            if (typeof config.endpoint === "undefined") {
                msg.payload = 'No API endpoint configured.';
                this.status({ fill: "red", shape: "dot", text: msg.payload });
                node.send(msg);
            } else if (typeof config.address === "undefined") {
                msg.payload = 'No LTO Wallet Address configured.';
                this.status({ fill: "red", shape: "dot", text: msg.payload });
                node.send(msg);
            } else {
                var ltoEndpoint = config.endpoint;
                var ltoAddress = config.address;

                if (ltoEndpoint == "") {
                    msg.payload = 'Empty API endpoint.';
                    this.status({ fill: "red", shape: "dot", text: msg.payload });
                    node.send(msg);
                } else {
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
            }
        });
    }
    RED.nodes.registerType("Validate LTO Address", ValidateLTOAddress);
}
