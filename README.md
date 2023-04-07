
# Getting Started 

# This project demo :  (https://space-social.online/login).

## Teachnical : 

* Nodejs (expressjs)
* React
* Firebase
* Redux
* SCSS

## With client 

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## With server
In the project directory, you can run:

### `npm run dev`
Runs the app in the development mode.\


## Image Sample :


![image](https://user-images.githubusercontent.com/108036581/230596281-2f1fd916-25c8-4b54-8a2f-b870ad42cca5.png)



![image](https://user-images.githubusercontent.com/108036581/230596449-541f8fc9-f184-43c8-bb4f-f3c34829147d.png)



![image](https://user-images.githubusercontent.com/108036581/230596568-4e2728c3-890b-4f31-8524-eeeaf81f1c00.png)




![image](https://user-images.githubusercontent.com/108036581/230596710-a363c96e-ad91-4547-abee-f45d6f998b29.png)



![image](https://user-images.githubusercontent.com/108036581/230596837-47cd7a59-119f-40c3-bbbe-3eb251f12b19.png)



![image](https://user-images.githubusercontent.com/108036581/230596996-5d549690-03f6-410c-8538-4b8bb5fb91f6.png)



![image](https://user-images.githubusercontent.com/108036581/230597140-250949da-8cb1-456d-80bf-ab5bc2f4d90b.png)


![image](https://user-images.githubusercontent.com/108036581/230597399-0fbafd61-1197-43e3-991c-36b8c5242c8b.png)


![image](https://user-images.githubusercontent.com/108036581/230597543-1d4aa638-5857-4daf-af35-b07b89c2bb2a.png)


![image](https://user-images.githubusercontent.com/108036581/230597722-93577239-d93a-489f-8a96-47ef15b7b8f6.png)


## Deployment :
I using AWS EC2 follow step by step in below : 

* Connection EC2

* Config Security in your instance :

![image](https://user-images.githubusercontent.com/108036581/230593596-c966d5e0-dc34-4c98-9e98-0b5622e9cb18.png)

* Install Nginx

```
  apt install nginx
```

* Installing and configure Firewall 

```
  apt install ufw
```

```
  ufw allow "Nginx Full"
```

* Delete the default server configuration

```
 rm /etc/nginx/sites-available/default
```

```
 rm /etc/nginx/sites-enabled/default
```

* Configuration :

```
  vi /etc/nginx/sites-available/space
```

```
  server {
    listen 80;

    location / {
          root /var/www/space;
          index  index.html index.htm;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
          try_files $uri $uri/ /index.html;
    }
  }
```

```
 ln -s /etc/nginx/sites-available/space /etc/nginx/sites-enabled/space
```

* Testing 
```
  vi /var/www/space/index.html
```
* Start Nginx testing
```
  systemctl start nginx
```
* Nginx Configuration api
```
  vi /etc/nginx/sites-available/space
```
```
  location /api {
          proxy_pass http://yourdomain:4000;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
    }
 ```
* Check nginx
```
  nginx -t 
```

* Download Node and npm using nvm

```
  sudo apt install curl 
  curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
```

```
  source ~/.profile
```

* Install node and npm

```
  nvm ls
```

```
  nvm install 16
```

* Create dir in root user

```
  mkdir space
```

* Clone git root/space : 

```
  git clone http://yourrepo.com/
```

* But if you close your ssh session here. It's gonna kill this process. To prevent this we are going to need a package which is called pm2

```
  npm i -g pm2
```

* Let's create a new pm2 instance

```
  pm2 start --name api src/index.js   
```

```
  pm2 startup ubuntu 
```

## React App Deployment :
 
 ```
  cd ../client
 ```
 
 ```
  npm i
 ```
 
 * Let's create the build file
 
 ```
  npm run build
 ```


* Right now, we should move this build file into the main web file

```
  rm -rf /var/www/space/*
```

```
  mkdir /var/www/space/client
```

```
  cp -r build/* /var/www/space/client
```

* Let's make some server configuration 

```
   location / {
          root /var/www/space/client/;
          index  index.html index.htm;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
          try_files $uri $uri/ /index.html;
    }

```
## Custom domain 

* Make sure that you created your A records on your domain provider website.
* Change your pathname from Router 
* Change your env files and add the new API address
* Add the following server config

```
  server {
   listen 80;
   server_name space-social www.space-social.online;

  location / {
   root /var/www/space/client;
   index  index.html index.htm;
   proxy_http_version 1.1;
   proxy_set_header Upgrade $http_upgrade;
   proxy_set_header Connection 'upgrade';
   proxy_set_header Host $host;
   proxy_cache_bypass $http_upgrade;
   try_files $uri $uri/ /index.html;
  }
  }

  server {
    listen 80;
    server_name api.space-social.online;
    location / {
      proxy_pass http://yourdomain:4000;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
      }
  }

  }

```
## SSL Certification :

```
  apt install certbot python3-certbot-nginx
```

```
  certbot --nginx -d example.com -d www.example.com
```

* Let’s Encrypt’s certificates are only valid for ninety days. To set a timer to validate automatically:

```
  systemctl status certbot.timer
```

### Note 
Config your app using domain ssl if use  SSL Certification 
