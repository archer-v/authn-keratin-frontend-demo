# authn-keratin-frontend-demo

This is a demo web app written in pure HTML & JS that demonstrates how to use Keratin AuthN server to manage authentication on the web-application side. No other backend software is used.

See also: 
* Keratin auth server written in go: https://github.com/keratin/authn-server
* Another app demo written in Ruby: https://github.com/keratin/authn-demo
* Keratin JS client library: https://github.com/keratin/authn-js, also there are client libs for golang and Ruby

This demo gives a clearer examples how to use Keratin JS-library for most frontend use cases: Login, Logout, Sign Up, Google & Facebook login using OAuth2

### Running

1. Download the project: `git clone https://github.com/mandalorian-one/authn-keratin-frontend-demo.git`
2. Copy env configuration file to .env: `cp .env-sample .env`
3. Start the docker images with the command: `docker-compose up`
4. Open the url: `http://localhost:4000`

That it is

Then try to login, signup, logout and so on.

![Screenshot from 2021-10-08 18-07-15](https://user-images.githubusercontent.com/41936843/136565100-7d0bf186-b146-4183-aee0-00c53796eb0f.png)
![Screenshot from 2021-10-08 18-08-09](https://user-images.githubusercontent.com/41936843/136565108-1c6d9ac0-c469-48f8-a6b4-69828c85f883.png)
![Screenshot from 2021-10-08 18-08-31](https://user-images.githubusercontent.com/41936843/136565111-d7933809-5744-47a3-b9d8-17ccfece62e8.png)
![Screenshot from 2021-10-08 18-09-05](https://user-images.githubusercontent.com/41936843/136565112-1fc8700d-d87d-4a41-94c5-fa732977dc34.png)


## Сlarification 

Keratin only does the authorization things and controls the auth data. It provides the ability to create accounts, login, logout, store sessions, process password recovery workflows and so on, but it doesn't serve user-profiles. All you have at the client's side is the session key which is linked to the user record inside the Keratin storage. Therefore, you need you own backend software to work with user profiles data (like names, photos, etc). 

And as a result, after login or session restoring after page reloads in this demo you won't see the user names which belong to the session. All you see is the session control buttons Login, Signup or Logout depends on the session state you are (logged in, or not)

### Some expanation about docker:

docker-compose.yml file describe 4 docker containers: 
* mysql as persistent storage that Keratin uses for storing user accounts
* redis as storage for sessions
* keratin server
* nginx server to server demo web application

It's default configuration with some startup logic. Edit .env file

### OAuth and social networks:

If you want to try Google or Facebook authorization, you should host this app at a public domain with https. You can edit nginx configuration file `authn-nginx.conf` to add SSL support and public domain name, then just restart the containers.  
Also, don't forget to edit .env and define GOOGLE_OAUTH_CREDENTIALS (or another social network) variable (go to Google Cloud Console in OAuth section to get the credentials). For example, if you host this app at the domain `exmaple.com`, you should define these variables in .env file: `AUTHN_URL=https://example.com/authn` and `APP_DOMAINS=example.com`

#### CP

The author of the login form template is Crative Tim: https://www.creative-tim.com/product/login-and-register-modal


