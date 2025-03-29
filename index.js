const express = require('express');  // Import Express
const app = express();               // Initialize Express app
const mineflayer = require('mineflayer');
const { Authflow } = require('prismarine-auth');

const PORT = process.env.PORT || 8080;

// Keep-alive server to prevent sleeping
app.get('/', (req, res) => {
  res.send('AFK Bot is running...');
});
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

const server = 'AnarchyNetwork.net'; 
const port = 25565;  
const username = '08villafuerte.ethan@gmail.com';  // Replace with your email
const cacheDir = './auth_cache'; 

const authflow = new Authflow(username, cacheDir, {
    flow: 'msal',
    authTitle: 'fda76342-5ed0-49cc-844d-528cf452b63f',  // Add Azure client ID here
    enableDebug: true
});

async function createBot() {
    const bot = mineflayer.createBot({
        host: server,
        port: port,
        username: username,
        auth: 'microsoft',
        authflow
    });

    bot.on('login', () => {
        console.log('✅ Bot logged in!');
        bot.chat('/msg Server Bot is AFK!');
    });

    bot.on('end', () => {
        console.log('⚠️ Bot disconnected, reconnecting...');
        setTimeout(createBot, 5000);
    });

    bot.on('error', (err) => console.log(`❌ Error: ${err}`));

    bot.on('kicked', (reason) => console.log(`🚫 Kicked: ${reason}`));

    bot.on('spawn', () => {
        console.log('🎮 Bot spawned');
        bot.setControlState('sneak', true);  
    });
}

createBot();
