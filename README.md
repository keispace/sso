# sso-nest

## Description
sso with nest

## Installation
```shell
yarn
```

## Usage
1. open /test.html in browser
2. click sso provider login (naver, kakao, google, facebook)
3. login provider
4. show your info and jwt 
5. verify jwt by GET http://localhost:3000/v1/auth/verify
 ``` json
 {"authorization": "Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi6rmA7JiB7KSAIGV2YW4iLCJlbWFpbCI6ImtlaXNwYWNlQGtha2FvLmNvbSIsImlhdCI6MTY5MjE1MTQwMCwiZXhwIjoxNjkzNDQ3NDAwfQ.sBf__sOT525Iyq6gzKViuKVW_R7kLHZvmNqCU046DDI" }
 ```

## config 
/config/development.env set secret, id of providers 

