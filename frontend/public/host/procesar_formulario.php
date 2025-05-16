

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

  $especie = $_POST['especie'];
  $correo = $_POST['correo'];
  $nombre_dueno = $_POST['nombre_dueno'];
  $telefono = $_POST['telefono'];
  $mensaje = $_POST['mensaje'];

  if (empty($nombre) || empty($raza) || empty($genero) || empty($color)) {
    // Alguno de los campos está vacío
    // Muestra un mensaje de error
    echo "Por favor, rellena todos los campos del formulario.";
  }
    if($_FILES["foto"]){
      $nombre_base = basename($_FILES["foto"]["name"]);
      $nombre_final = date("d-m-y"). "-". date("H-i-s"). "-". $nombre_base;
      $ruta = "img_bd/". $nombre_final;
      $subirarchivo = move_uploaded_file($_FILES["foto"]["tmp_name"], $ruta);
      if($subirarchivo){
        $query = "INSERT INTO mascotas_perdidas (nombre, raza, genero, color, descripcion, fecha_perdida, especie, correo, nombre_dueno, telefono, mensaje, imagen) VALUES ('$nombre', '$raza', '$genero', '$color', '$descripcion', '$fecha_perdida','$especie','$correo','$nombre_dueno','$telefono','$mensaje', '$ruta')";

      }
    }
  // Ejecuta la consulta
  mysqli_query($conn, $query);
  //Redirige a la página de inicio
  header('Location: busqueda.php');
    // Cierra la conexión
    mysqli_close($conn);
?>

