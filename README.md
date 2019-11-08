.env
coverage
node_modules
.next
/nbproject/private/

1a8c8a3

UNDER CONSTRUCTION

Jetter is a reddit clone built for the purpose of learning in depth
new web development skills. This project uses a microservice architecture

Technologies used for this project:

- [Ruby on Rails](https://rubyonrails.org)
- [NextJS](https://nextjs.org/)
- [Kong](https://konghq.com/kong/)
- [Konga](https://pantsel.github.io/konga/)
- [Docker](https://www.docker.com/)
- [CircleCI](https://circleci.com/)
- [PostgreSQL](https://www.postgresql.org/)

Installation instructions for lo--recurse-submodulescal development:

1. `git clone --recurse-submodules https://github.com/nix12/jetter.git`
   Clone the repository for local development.
2. `cd jetter`
   Change into the directory of the project.
3. `docker-compose up`
   Start the services containing the project. This may take a few minutes. (describe exit 0)
4. `docker-compose run user_authentication_and_authorization rails db:setup`
   Setup the user_auth service. Next, check [http://localhost:3001](http://localhost:3001).
   You should see a page saying "Yay! You’re on Rails!"
5. `docker-compose run forum_api rails db:setup`
   Setup the forum_api service. Next, check [http://localhost:3002](http://localhost:3002).
   You should see a page saying "Yay! You’re on Rails!"
6. Go to the Kong GUI at [http://localhost:1337](http://localhost:1337). This GUI is called Konga,
   and it what we will use to setup the Kong gateway.
7. Create a Konga account, then go back to your terminal.
8. `docker-compose exec jetter-client sh -c 'ping kong'`
   Copy the following IP address. This address is need for the next step.(ctrl + c to stop)
9. At the Konga welcome page select default for creating a connection to the Kong API.
   Enter the name you want to call the admin connection. For the kong admin url
   enter: http://<Enter Kong IP address from step 8>:8001, then click "create connection."
   Now the connection with the Kong API is complete, so head back to your terminal.
10. `docker-compose exec jetter-client sh -c 'ping user_authentication_and_authorization'`
    Grab the IP address the as you did in step 8. This address will be used to setup the kong
    service for the user_auth API.
    (Save the IP addresses because they will used in route headers later)
11. In Konga, click services under the "API GATEWAY" heading in the side panel. Then click the
    "ADD NEW SERVICE" button. In the following window, enter the name (I named mine user-auth)
    and description of the service. For the protocol, enter http, and for the port, enter 3000.
    Click the "SUBMIT SERVICE" button. Now there is a new service.
12. Next in Konga, we are going to setup the for the newly created service. Routes can only be
    created from the service page. Click on the new service name, then under "service details"
    click routes. Next click the "ADD ROUTES" button. In the following window, enter a name for
    the route. Scroll down to the methods section and enter the following:
    (BE SURE TO HIT ENTER AFTER EACH AND CAPITALIZE) GET, POST, PUT, PATCH, DELETE, OPTIONS.
    Click "SUBMIT ROUTE." Now we have associated a route with a service in Kong.
13.

```shell
  curl -i -X PATCH --url http://localhost:8001/routes/<name or ID of route> \
  -d '{"headers": { "resources": ["<Enter user_authentication_and_authorization IP address>"] } }' \
  -H "Content-Type: application/json"
```

This command will set the headers for the route headers.

14. Now its time to activate the CORS plugin on the service. This will allow requests to be sent
    from the client to the backend APIs. Click the "SERVICES" link in the side panel, then click
    the service name. Under "Service Details" click plugins. In the window click "Security", then
    click "ADD PLUGIN" under CORS. Here under "origins", enter \* then press return. Next, under
    "orgins," enter Authorization the press return, and then enter resouces(lowercase) and press
    return. Lastly, for methods, copy and paste the following list:
    GET, POST, PUT, PATCH, DELETE, OPTIONS. Then press enter. Click "ADD PLUGIN."
    CORS is now setup and ready to go.
15. `docker-compose exec jetter-client sh -c 'ping forum_api'`
    Grab the IP address the as you did in step 8. This address will be used to setup the kong
    service for the forum_api. (Be sure to save the IP address)
16. Repeat steps 11-14 for them forum_api container.
17. Now we will create a consumer for Kong API to consume the client. In Konga go to the consumers
    link and click "CREATE CONSUMER." Enter a username and custom_id of your choosing (for this I
    chose jetter-client for both). Your consumer is now created. Click on your new consumer.
    Go to the "Credentials" tab. Click JWT and "CREATE JWT." Continuing, click "SUBMIT." JWT
    credentials have now been created. Next, go to (https://jwt.io)[https://jwt.io]. We will begin
    crafting a JWT token for the client. Scroll down to the debugger and under "PAYLOAD," in be the
    curly braces, replace everything with with "iss": "key value". The key value can be found in
    Konga by clicking consumers, consumer name, credentials, JWT. The "key value" should be the keys
    value. Finally, copy the secret value and place it in the "VERIFY SIGNATURE" where it says
    "your-256-bit-secret." The token is now crafted and can be found on the left hand side under
    "Encoded." Copy the token and go back to the Jetter project. In /jetter-client create a
    file called .env and in it create a variable called KONG_JWT and assign it the token. So, the
    .env file should have a variable that look like this:
    KONG_JWT=\<TOKEN HERE>
18.

```shell
  docker-compose exec user_authentication_and_authorization rake \
  "doorkeeper:create_application[client, http://localhost:3000/auth/callback]"
```

This will print out information needed to register the client with the user_auth API.
Open the .env file created in the last step. The CLIENT_ID will be the
application_id that was printed out. The CLIENT_SECRET will be the application_secret
that was printed out. Your .env file should now look like:
KONG_JWT=\<TOKEN HERE>
CLIENT_ID=\<application_id>
CLIENT_SECRET=\<application_secret>

19. `docker-compose exec jetter-client sh -c 'ping kong'`
    Grab the Kong IP address and go to /jetter-client/services/axios/axios-user.js.
    Replace the current IP address in baseURL with the new Kong IP address at port 8000.
    Grab the Kong IP address and go to /jetter-client/services/axios/axios-forum.js.
    Replace the current IP address in baseURL with the new Kong IP address at port 8000.
20. `docker-compose exec jetter-client sh -c 'ping user_authentication_and_authorization'`
    Grab the Kong IP address and go to /jetter-client/services/axios/axios-user.js.
    Replace the current IP address in request.headers.resources with the new
    user_authentication_and_authorization IP address.
21. `docker-compose exec jetter-client sh -c 'ping forum_api'`
    Grab the Kong IP address and go to /jetter-client/services/axios/axios-forum.js.
    Replace the current IP address in request.headers.resources with the new
    forum_api IP address.
22. `docker restart jetter_jetter-client_1`
23. Open (http://localhost:3000)[http://localhost:3000] to experiment with the application.

Instructions for after completely restarting all containers.

1. `docker-compose exec jetter-client sh -c 'ping kong'`
   Grab the Kong IP address and go to /jetter-client/services/axios/axios-user.js.
   Replace the current IP address in baseURL with the new Kong IP address at port 8000.
   Grab the Kong IP address and go to /jetter-client/services/axios/axios-forum.js.
   Replace the current IP address in baseURL with the new Kong IP address at port 8000.
2. `docker-compose exec jetter-client sh -c 'ping user_authentication_and_authorization'`
   Grab the Kong IP address and go to /jetter-client/services/axios/axios-user.js.
   Replace the current IP address in request.headers.resources with the new
   user_authentication_and_authorization IP address.
   In Konga go to services and click on the container correlating to the
   user_authentication_and_authorization container and replace the host IP address with
   the new IP address.
3.

```shell
  curl -i -X PATCH --url http://localhost:8001/routes/<name or ID of route> \
  -d '{"headers": { "resources": ["<Enter user_authentication_and_authorization IP address>"] } }' \
  -H "Content-Type: application/json"
```

Update the route header for correlating to the user_authentication_and_authorization service
in the terminal

4. `docker-compose exec jetter-client sh -c 'ping forum_api'`
   Grab the Kong IP address and go to /jetter-client/services/axios/axios-forum.js.
   Replace the current IP address in request.headers.resources with the new
   forum_api IP address. In Konga go to services and click on the container correlating to the
   forum_api container and replace the host IP address with the new IP address.
5.

```shell
  curl -i -X PATCH --url http://localhost:8001/routes/<name or ID of route> \
  -d '{"headers": { "resources": ["<Enter user_authentication_and_authorization IP address>"] } }' \
  -H "Content-Type: application/json"
```

Update the route header for correlating to the forum_api service in the terminal.

Phase 1:

- Reddit style deletion
- Links
- All jet
- Reddit style sorting
- Trending jets
- Moderator support
- Lockdown

Phase 2:

- Saving posts
- Tagging
- Admin
- Mobile
- Search/Elasticsearch
- API interactions for Photos and Videos
- CDN

Services to be added in the future:

- Messaging
- Analytics
- Mailer
- Notifications
- Chat
- Donations
- Alternate logins
