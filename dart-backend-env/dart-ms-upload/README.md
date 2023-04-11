# MICRO-SERVICE XPRL implementation

The micro-service handles the file upload to S3 processes, including IPFS and pinata functionality.

## Technologies

* NodeJS: Version 18.x.x

## Instalation

1. git clone the project
2. npm install
3. npm start

## Requisites

* An AWS account with the S3 functionality configured at <https://aws.amazon.com>.
* A pinata account at <https://pinata.cloud>

## Use-cases

* Photo upload
  Simple image upload to S3 service

* File upload (for NFT)
  Handles the IPFS and pinata functionality before uploading to S3.

## Logs

Check the "logs" directory within the root directory.

## TODO

1. Fix the IPFS-pinata funtionality so pinata can find the files.
2. Complete the File upload process.
3. Add rules and validation.
4. Use the gateway.
