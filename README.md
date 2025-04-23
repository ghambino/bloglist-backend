command for generating ssl (socket security layer) certificates to encrypt bi-directional communication the existing http server to becomes http

1. openssl genrsa -out key.pem
2. openssl req -new -key key.pem -out csr.pem
3. openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem