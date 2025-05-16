<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Mascotas perdidas</title>
</head>

<body>
    <h1>Formulario de mascotas perdidas</h1>
    <form action="procesar_formulario.php" method="post">
        <label for="nombre">Nombre:</label><br>
        <input type="text" id="nombre" name="nombre"><br>
        <label for="raza">Raza:</label><br>
        <input type="text" id="raza" name="raza"><br>
        <label for="genero">Género:</label><br>
        <input type="radio" id="genero" name="genero" value="M"> Macho<br>
        <input type="radio" id="genero" name="genero" value="F"> Hembra<br>
        <label for="color">Color:</label><br>
        <input type="text" id="color" name="color"><br>
        <label for="descripcion">Descripción:</label><br>
        <textarea id="descripcion" name="descripcion"></textarea><br>
        <label for="fecha_perdida">Fecha de pérdida:</label><br>
        <input type="date" id="fecha_perdida" name="fecha_perdida"><br>
        <label for="foto">Foto:</label><br>
        <input type="file" id="foto" name="foto"><br><br>
        <input type="submit" value="Enviar">
    </form>
    <h1>Mascotas perdidas</h1>
</body>

</html>







<?php
  // Incluye el archivo de conexión
  require_once 'conexion.php';

  // Recibe los datos del formulario
  $nombre = $_POST['nombre'];
  $raza = $_POST['raza'];
  $genero = $_POST['genero'];
  $color = $_POST['color'];
  $descripcion = $_POST['descripcion'];
  $fecha_perdida = $_POST['fecha_perdida'];
  $foto = $_POST['foto'];

  if (empty($nombre) || empty($raza) || empty($genero) || empty($color)) {
    // Alguno de los campos está vacío
    // Muestra un mensaje de error
    echo "Por favor, rellena todos los campos del formulario.";
  } else {
    // Todos los campos están rellenos
    // Continúa con el procesamiento del formulario
    // Crea la consulta
    $query = "INSERT INTO mascotas_perdidas (nombre, raza, genero, color, descripcion, fecha_perdida) VALUES ('$nombre', '$raza', '$genero', '$color', '$descripcion', '$fecha_perdida')";

    // Ejecuta la consulta
    mysqli_query($conn, $query);
  
    //Redirige a la página de inicio
    header('Location: formulario.php');
  
    // Cierra la conexión
    mysqli_close($conn);
  }
?>





<?php

  if (isset($_POST['submit'])) {
  // Incluye el archivo de conexión
  require_once 'conexion.php';
  // Obtiene los datos del formulario
  $nombre = mysqli_real_escape_string($conn, $_POST['nombre']);
  $raza = mysqli_real_escape_string($conn, $_POST['raza']);
  $genero = mysqli_real_escape_string($conn, $_POST['genero']);
  $color = mysqli_real_escape_string($conn, $_POST['color']);
  $descripcion = mysqli_real_escape_string($conn, $_POST['descripcion']);
  $fecha_perdida = mysqli_real_escape_string($conn, $_POST['fecha_perdida']);
  // Verifica si se ha seleccionado una imagen
  if ($_FILES['foto']['size'] > 0) {
    // Almacena la imagen en una variable
    $foto = file_get_contents($_FILES['foto']['tmp_name']);
  } else {
    // Si no se ha seleccionado una imagen, almacena un valor null
    $foto = null;
  }

  if (empty($nombre) || empty($raza) || empty($genero) || empty($color)) {
    // Alguno de los campos está vacío
    // Muestra un mensaje de error
    echo "Por favor, rellena todos los campos del formulario.";
  }
  else{
  // Verifica si se ha enviado el formulario
  
    // Inserta los datos en la base de datos
    $sql = "INSERT INTO mascotas_perdidas (nombre, raza, genero, color, descripcion, fecha_perdida, foto)
    VALUES ('$nombre', '$raza', '$genero', '$color', '$descripcion', '$fecha_perdida', '$foto')";
    mysqli_query($conn, $sql);
    // Cierra la conexión a la base de datos
    mysqli_close($conn);
    //Redirige a la página de inicio
    header('Location: formulario.php');
  
    // Cierra la conexión
    mysqli_close($conn);
  }
}

?>
