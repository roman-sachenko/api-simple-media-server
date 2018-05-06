# Simple Media Streaming App

1. [Description](#description) 
  * [Ideology](#ideology)
  * [Usage](#usage) 
2. [Installation](#installation)
  * [Requirements](#requirements)
  * [Installation Steps](#installation-steps)
  * [Running the package](#running-the-package)


## Description

A simple media streaming application aimed to show how to work with streams, encrypt media links and provide with temporary access to resources. 

### Ideology

- send all the data using NodeJS streams instead of sending entire files
- create temporary media links (with expiration date) due to the security reasons
- not reveal direct file link (link to media storage server)  

### Usage

API: `http://localhost:3000/api/media/files/` - get file list (encrypted links) from media storage server.

Respond with 2 file links types:
- originalStream (provides a regular readable file stream)
- encryptedStream (provides with encrypted file stream, should be decrypted in order to read)

API: `http://localhost:3001/media/<encrypted link>` - get a regular file stream (will be opened by browser)
API: `http://localhost:3001/media/<encrypted link>/?option=encrypted` - get an encrypted file stream (won't be possible to open by default)

*Each encrypted link will be expired in 'X' second and won't be accessible due to the security reason.



## Installation

### Requirements

#### Node

Visit https://nodejs.org for installation details.

#### npm

Node Package Manager, should come bundled with node.

#### Redis

Install Redis https://redis.io/topics/quickstart


### Installation Steps

#### Clone the package

1. Create a folder with the chosen name
2. Run `$ git clone <package url> .`

#### install dependencies

1. Access sub-applications dirs (`$cd api`, `$cd media_proxy`, `$cd media_storage`)
2. Run `$ npm install` 

#### App Settings

1. Check `./api/config/env/env.js`, `./media_proxy/config/env/env.js`, `./media_storage/config/env/env.js` 
2. Update settings according to your needs and environment specifications

### Running the package

`$ cd api && npm run start`
`$ cd media_proxy && npm run start`
`$ cd media_storage && npm run start`
