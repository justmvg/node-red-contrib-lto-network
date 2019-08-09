## LTO Network.
---
A Node-RED node wrapper to make calls to a LTO Node API and retrieves information of the LTO Network.

<img src="https://github.com/justmvg/node-red-contrib-lto-network/blob/master/readme/node-red.jpg" />
<img src="https://github.com/justmvg/node-red-contrib-lto-network/blob/master/readme/2.jpg" />

It allows you to easily get LTO Network information in your Node-RED flows. Output of the nodes result in JSON format just like the LTO Node API does
Configure the node of your choise which offers API usage.

Input addresses can be set in 2 ways:
- On the node-red node configurator
- Input as JSON object (`msg.payload.address`)

#### Possibilities
Make it up yourself! No restrictions here.

Examples: 
Graph your balance over time, automate checks of wallet balances, build notifications on wallet changes, etc… 

At this moment, three modules are available: 
- Get balance
- Validate address
- Get active leases

And more to follow!

<img src="https://github.com/justmvg/node-red-contrib-lto-network/blob/master/readme/1.jpg" />

Links:
LTO Community profile: https://community.lto.network/user/michael21/profile/
