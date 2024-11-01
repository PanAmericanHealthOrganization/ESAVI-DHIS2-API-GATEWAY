Construcción de una nueva imagen

docker build -t dhis2-gateway .

ejemplo de despliegue de la imagen

`docker run -p 3000:3000 --env-file=.env nombre_de_la_imagen`
