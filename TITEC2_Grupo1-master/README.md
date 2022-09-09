## Migracion de Android Studio nativo hacia React Native

### Vistas
- Menu Inicio (Sujeta a cambios de diseño durante alpha 1) 
- Talleres (Sujeta a cambios de diseño) (Habrá que mejorar la vista en diseño para beta 1 ya que en versiones móbiles distintas no se ve bien)
- Detalles talleres (Sujeta a cambios de diseño) (Habrá que mejorar la vista en diseño para beta 1 ya que en versiones móbiles distintas no se ve bien)
- Postulacion taller (Alpha 2)
- Mis solicitudes (Alpha 3)
- Vista de errores (Finalizada)
- Vista de entradas vacias (Finalizada)

### Definicion de directorios
- components: aqui iran todos los componentes relacionados a la aplicacion (App.js es el componente principal y este ira afuera del direc. src).
- services: aqui es donde se obtendran los servicios como para realizar una peticion http u otros.
### Notas sobre algunos cambios de la version alpha 1:
- No irá la carpeta routes puesto que se encontro la forma de dejar todo unido en navegacion desde App.js.
- En la carpeta components se dejan todas las vistas a ocupar.
- En la carpeta services se traen todos los servicios hechos con fetch, desde la rest API creada en taller de integracion 1.
- Los colores se han actualizado a una versión correspondiente UV, es decir, a colores que sean adecuados a las versiones que muestran los módulos de la universidad.
- Se han hecho dos vistas adicionales ligadas a los errores y listas vacias de arrays que tengan los llamados de la API-REST.
- Se agrega también un preguntas frecuentes en la aplicación en el inicio para mostrar que cosas se realizan.
### Versión alpha 2, ¿Que se tiene pensado?:
- Cambio en parte de imágenes para mostrar correspondientes (detalles y ver talleres) (Finalizado)
- Creación de la vista del formulario de postulación a un taller (Finalizado)
- Manejo de errores humanos del formulario
- Ingreso de información exitosa a la base de datos mediante la rest api (Finalizado)
- Cambios sobre llamados en la rest api ligado al primer punto (Finalizado)
- RETORNO SEGUNDO SEMESTRE EN ALPHA 2  
### RETORNO ALPHA 2
- Como se ha vuelto a trabajar en el mes de agosto seguiremos actualizando las informaciones antes puesta en los trabajos hechos 
- Durante 2 semanas se avanzará en terminar el trabajo (no diseño solo modulos) 
- Entre 09 hasta 14 de agosto Manejo de errores humanos del formulario
- Entre 15 hasta 21 de agosto Mis solicitudes 
- Desde el retorno a clases se trabajará en estética con beta 1 en adelante.
### Cosas pendientes para realización del modulo de talleres
- Consultar en una reunión general (Cliente y compañeros) acerca de las observaciones médicas (almacenamiento)
- Hablar acerca de nombre tabla localidad atributo localidad cambio por distrito
- Hablar acerca de nombre tabla localidad atributo poblacion_o_villa por barrio
