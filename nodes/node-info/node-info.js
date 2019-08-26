var request = require('request');
var request = request.defaults({ jar: true })
var defaultAPI = "https://nodes.lto.network";

module.exports = function (RED) {
    
    function GetNodeInfo(config) {
        RED.nodes.createNode(this, config);

        var node = this;
        node.on('input', function (msg) {

            if (typeof config.endpoint === "undefined" || config.endpoint == "") {
                config.endpoint = defaultAPI;
            }
            var ltoEndpoint = config.endpoint;

            var statusCall = new Promise(function(resolve,reject){
                request.get(ltoEndpoint + '/node/status', (err, response, body) => {
                    if (err) {
                        reject('Failed:', err)
                    } else {
                        resolve(JSON.parse(body))
                    }
                })
            })
            var versionCall = new Promise(function(resolve,reject){
                request.get(ltoEndpoint + '/node/version', (err, response, body) => {
                    if (err) {
                        reject('Failed:', err)
                    } else {
                        resolve(JSON.parse(body))
                    }
                })
            })
            
            Promise.all([statusCall, versionCall]).then( (val) => {
                this.status({ fill: "green", shape: "dot", text: 'LTO Info retrieved' });
                var obj = { ...val[0], ...val[1] }
                msg.payload = obj;
                node.send(msg);
            })


                
        });
    }
    RED.nodes.registerType("Node info", GetNodeInfo);
}