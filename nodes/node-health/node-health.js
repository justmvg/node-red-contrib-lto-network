var request = require('request')
const net = require('net')
var request = request.defaults({ jar: true })
var defaultAPI = "nodes.lto.network"

module.exports = function (RED) {
    
    function GetNodeHealth(config) {
        RED.nodes.createNode(this, config);

        var node = this;
        node.on('input', function (msg) {

            if (typeof config.endpoint === "undefined" || config.endpoint == "") {
                config.endpoint = defaultAPI;
            }
            if (typeof config.nodeport === "undefined" || config.nodeport == "") {
                config.nodeport = '6868';
            }
            if (typeof config.apiport === "undefined" || config.apiport == "") {
                config.apiport = '6869';
            }

            var portCheck = (host, cport) => {
                return new Promise((resolve, reject) => {
                    const socket = new net.Socket()
                    const onError = () => {
                        socket.destroy()
                        resolve(false)
                    }
                    socket.setTimeout(1000)
                    socket.once('error', onError)
                    socket.once('timeout', onError)
                    socket.connect(cport, host, () => {
                        socket.end();
                        resolve(true);
                    });
                })
            }
            var nodeWallet = (fhost, fport) => {
                return new Promise((resolve,reject) => {
                    request.get('http://'+fhost+':'+fport+'/addresses', (err, response, body) => {
                        res = JSON.parse(body)
                        if (err) {
                            reject('Failed:', err)
                        } else {
                            if(Array.isArray(res)){
                                resolve(res[0])
                            }else {
                                reject('Failed: No valid response.')
                            }
                        }
                    })
                })
            }
            const nodeBalance = (fhost, fport, addr) => {
                return new Promise((resolve,reject) => {
                    request.get('http://'+fhost+':'+fport+'/addresses/balance/details/'+addr, (err, response, body) => {
                        res = JSON.parse(body)
                        if (err) {
                            reject('Failed:', err)
                        } else {
                            if(res.hasOwnProperty('regular')){
                                resolve(res)
                            }else {
                                reject('Failed: No valid response.')
                            }
                        }
                    })
                })
            }
            Promise.all([
                portCheck(config.endpoint, config.nodeport).catch((err) => { return err }),
                portCheck(config.endpoint, config.apiport).catch((err) => { return err })
            ]).then((portres) => {
                var getBalance = new Promise((resolve, reject) => {
                    if(portres[1] === true){
                        nodeWallet(config.endpoint, config.apiport).then((addr) => {
                            nodeBalance(config.endpoint, config.apiport, addr).then((walletbalance)=>{
                                resolve(walletbalance)
                            }).catch((err)=>{
                                return err;
                            })
                        }).catch((err)=>{
                                return err;
                            })
                    }else {
                        resolve(null)
                    }
                })
                getBalance.then((balance) => {
                    this.status({ fill: "green", shape: "dot", text: 'node:'+config.endpoint })
                    var obj = { "node-available": portres[0], "api-available": portres[1], "balance": balance.available }
                    msg.payload = obj
                    node.send(msg)
                }).catch((err)=>{
                    this.status({ fill: "red", shape: "dot", text: 'Something went wrong, check config' })
                    console.log(err)
                })
            })                
        });
    }
    RED.nodes.registerType("Node health", GetNodeHealth);
}