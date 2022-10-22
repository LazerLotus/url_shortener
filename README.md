# Url Shortener
This is a simple web to shorten url and share with shorter link with your friends!

# Dependency
- express: 4.18.2
- express-handlebars: 4.0.2
- node.js: 14.16.0
- nodemon: 2.0.20
- mongoose: 5.9.7

# Feature
1. Url Shortener
Allow User to enter a url and transfer it to a 5-characters short url
- If this url has been shorten before, result page will show the previous url
- User can click copy button to copy short url directly to clipboard. 

2. Redirect with short url
User can enter the short url then direct to the target page.
- If this url is invalid, redirect result will show error page.

# Install this Project
0. before you start install project, please make sure you already installed node.js and npm
1. Start your Terminal 
```
git clone https://github.com/LazerLotus/url_shortener.git
```
2. change directory to url_shortener
3. enter following command in your terminal
```
npm install 
```
4. after installation, enter following command in your terminal
```
npm run dev
```
5. check following message is shown on terminal
```
Express is listening on localhost:3000
```
6. open your browser and type localhost:3000 on url 
7. if you want to stop service, please press ctrl+c in your terminal


# Contributor
Lu-An Tsai
luan.tsai1991@gmail.com