# Información
Esta carpeta contiene dos ficheros. En el *docker-compose.yaml* hay configuradas dos imágenes docker.
- Una para levantar un Elasticsearch con la versión 8.4.1.
- Otra para levantar Kibana con la versión 8.4.1 que se conecta al anterior Elasticsearch.

### Configuración
Para arrancarlo debemos tener instalado Docker y Docker compose. En mi caso tengo la versión 2.10.2. Si usted dispone de otra debe ir al *docker-compose.yaml* y configurarla en el primer parámetro *version*. Una vez tenga esto simplemente debe ejecutar el comando:  

```shell
$> docker-compose up -d
```

La opción -d es para ejecutar los contenedores en segundo plano.
Una vez arrancados los contenedores nos servira un Elasticsearch en el puerto 9200 y Kibana en el puerto 5601.