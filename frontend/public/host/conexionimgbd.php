<?php
$host = "redyanbal.com";
$user = "giancarlo_userformulario";
$password = "GianKim20";
$img_bd = 'img_bd';

$conexionimgbd = mysqli_connect($host, $user, $password, $img_bd);
// Verifica la conexión
if (!$conexionimgbd) {
    die("Conexión fallida: " . mysqli_connect_error());
}
echo "Conexión exitosa";
?>
