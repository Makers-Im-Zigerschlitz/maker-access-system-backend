# Login

Used to collect a Token for a registered User.

**URL** : `/auth/dologin/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "username": "[valid username]",
    "password": "[password in plain text]"
}
```

**Data example**

```json
{
    "username": "user123",
    "password": "abcd1234"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "successful": true
}
```

## Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `200 OK`

**Content** :

```json
{
  "successful": false
}
```
