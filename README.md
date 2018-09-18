# loopback-static-roles

You need the jwt private key as a enviromnent variable to use this package.

The auth token must be pass in the header as an "Authorization" key to a "bearer jwttoken" value.

# Install

 ```npm i loopback-static-roles```

### Edit component-config.json

default private_key_name = JWT_PRIVATE_KEY

default tokenAttName = user_type
```
{
  ...,
  "loopback-static-roles": {
    "roles": [
      "EXAMPLEADMIN",
      "EXAMPLEREADER"
    ],
    "private_key_name": "JWT_KEY",
    "tokenAttName": "anotheratt"
  },
  ...
}
```

### Add the mixin in the model-config.json
```
{
  ...,
  "mixins": [
        "loopback/common/mixins",
        "loopback/server/mixins",
        "../node_modules/loopback-static-roles",
        "../common/mixins",
        "./mixins"
      ],
  ...
}
```

### You need the following loopback models
* AccessToken
* ACL
* Role
