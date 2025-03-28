# Email Setup for Vector

### Install Dependencies
```
npm install
```

### Start Server

```
node server.js
```

### For keeping the Server Running in VPS/Dedicated Server

## USING PM2

#### 1. Install PM2
  ```
  npm install -g pm2
  ```
#### 2. Start Your Server with PM2
   ```
   pm2 start server.js --name vector-server
   ```
#### 3. Make It Restart on Reboots
  ```
    pm2 startup
  ```
  ```
    pm2 save
  ```
#### 4. Check Running Processes
  ```
  pm2 list
  ```


### Restart Server
```
pm2 restart vector-server
```

### Stop Server
```
pm2 stop vector-server
```


## Using a Systemd Service (For Linux Servers)
#### 1. Create a Service File
```
sudo nano /etc/systemd/system/vector-server.service
```
#### 2. Add This Configuration
```
[Unit]
Description=Vector Server
After=network.target

[Service]
ExecStart=/usr/bin/node /path/to/server.js
Restart=always
User=root
Group=root
Environment=NODE_ENV=production
WorkingDirectory=/path/to

[Install]
WantedBy=multi-user.target

```
_Replace **/path/to/server.js** with the actual path._

#### 3. Enable and Start It
```
sudo systemctl daemon-reload
sudo systemctl enable vector-server
sudo systemctl start vector-server
```
#### 4. Check STatus
```
sudo systemctl status vector-server
```

## Using Forever (Alternative to PM2)
```
npm install -g forever
```
```
forever start server.js
```

**Thats all.**
