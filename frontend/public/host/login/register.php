<?php

@include 'config.php';
require 'funcs.php';
require_once 'conexion.php';


if(isset($_POST['submit'])){

   $nombre = mysqli_real_escape_string($conn, $_POST['nombre']);
   $usuario = mysqli_real_escape_string($conn, $_POST['usuario']);
   $email = mysqli_real_escape_string($conn, $_POST['email']);
   $pass = md5($_POST['password']);
   $cpass = md5($_POST['cpassword']);
   $user_type = $_POST['user_type'];
   $captcha = $_POST['g-recaptcha-response'];

   $activo = 0;
   $tipo_usuario = 2;

   $secret = '6Ld0KjIkAAAAAJwu2pPE3YAnr-HPJcm2o8PjIuls';
   if(!$captcha){
      $errors[] = "Por favor verifica el captcha";
   }
   if(isNull($nombre, $usuario, $password, $con_password, $email))
   {
      $errors[] = "Debe llenar todos los campos";
   }
   if(!isEmail($email))
   {
      $errors[] = "Dirección de correo inválida";
   }
   if(!validaPassword($password, $con_password))
   {
      $errors[] = "Las contraseñas no coinciden";
   }

   if(usuarioExiste($usuario))
   {
      $errors[] = "El nombre de usuario $usuario ya existe";
   }

   if(emailExiste($email))
   {
      $errors[] = "El correo electronico $email ya existe";
   }

   if(count($errors) == 0)
   {
      $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secret&response=$captcha");
      $arr = json_decode($response, TRUE);

      if($arr['success']){
         $pass_hash = hashPassword($password);
         $token = generateToken();
         $registro = registraUsuario($usuario, $pass_hash, $nombre, $email, $activo, $token, $tipo_usuario);

         if($registro > 0)
         {
            $url = 'http://'.$_SERVER["SERVER_NAME"].'/login/activar.php?id='.$registro.'&val='.$token;
         } else{
            $errors[] = "Error al Registrar";
         }
      }else{
         $errors[] = 'Error al comprobar Captcha';
      }
   }


   
   

   $select = " SELECT * FROM user_form WHERE email = '$email' && password = '$pass' ";

   $result = mysqli_query($conn, $select);

   if(mysqli_num_rows($result) > 0){

      $error[] = 'usuario ya existente!';

   }else{

      if($pass != $cpass){
         $error[] = 'contraseña no coincide!';
      }else{
         $insert = "INSERT INTO usuario(nombre, usuario, email, password, user_type) VALUES('$nombre','$usuario','$email','$pass','$user_type')";
         mysqli_query($conn, $insert);
         header('location:login_form.php');
      }
   }

};


?>
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="utf-8">
      <!--[if IE]>
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <![endif]-->
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
      <!-- page title -->
      <title>Espaw Finder</title>

      <!-- Font files -->
      <link href="https://fonts.googleapis.com/css?family=Roboto:400,600,700%7CMontserrat:400,500,600,700" rel="stylesheet">
      <link href="fonts/flaticon/flaticon.css" rel="stylesheet" type="text/css">
      <link href="fonts/fontawesome/fontawesome-all.min.css" rel="stylesheet" type="text/css">
      <!-- Bootstrap core CSS -->
      <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
      <!-- style CSS -->
      <link href="css/style.css" rel="stylesheet">
      <!-- plugins CSS -->
      <link href="css/plugins.css" rel="stylesheet">
      <!-- Colors CSS -->
      <link href="styles/maincolors.css" rel="stylesheet">
      <script src='https://www.google.com/recaptcha/api.js'></script>
      <!-- custom css file link  -->
      <link rel="stylesheet" href="registerlogin.css">
   </head>
   <!-- ==== body starts ==== -->
   <body id="top" class="bg-image">
      <!-- Preloader  -->
      <div id="preloader">
         <div class="container h-100">
            <div class="row h-100 justify-content-center align-items-center">
               <div class="preloader-logo">
                  <!--logo -->
                  <img src="img/logo.png" alt="" class="img-fluid">
                  <!--preloader circle -->
                  <div class="lds-ring">
                     <div></div>
                     <div></div>
                     <div></div>
                     <div></div>
                  </div>
               </div>
               <!--/preloader logo -->
            </div>
            <!--/row -->
         </div>
         <!--/container -->
      </div>
      <!--/Preloader ends -->

<div class="form-container register">

   <form action="" method="post">
      <h3>registrarte</h3>
      <?php
      if(isset($error)){
         foreach($error as $error){
            echo '<span class="error-msg">'.$error.'</span>';
         };
      };
      ?>
      <input type="text" name="nombre" required placeholder="Ingresa tu nombre">
      <input type="text" name="usuario" required placeholder="Ingresa tu nombre de usuario">
      <input type="email" name="email" required placeholder="Ingresa tu correo">
      <input type="password" name="password" required placeholder="Ingresa tu contraseña">
      <input type="password" name="cpassword" required placeholder="Confirma tu contraseña">
      <br>
      <div class="captcha-container">
         <div class="g-recaptcha" data-sitekey="6Ld0KjIkAAAAAIixvWBppHMS-w8C_0bCH2I2H0x-
         "></div>
         <img src="img/yorobot.png" alt="Imagen de ejemplo" width="100" height="100">   
      </div>
      <input type="submit" name="submit" value="registrarse ahora" class="form-btn">
      <p>Ya tienes una cuenta? <a href="login.php">iniciar sesión</a></p>
   </form>

</div>
      <!-- ==== footer ==== -->
      <footer class="bg-light pattern11">
         <div class="container">
            <div class="row">
               <div class="col-lg-3 text-center ">
                  <img src="img/logo.png"  class="logo-footer img-fluid" alt=""/>
                  <!-- Start Social Links -->
                  <ul class="social-list text-center list-inline">
                     <li class="list-inline-item"><a title="Facebook" href="#"><i class="fab fa-facebook-f"></i></a></li>
                     <li class="list-inline-item"><a title="Twitter" href="#"><i class="fab fa-twitter"></i></a></li>
                     <li class="list-inline-item"><a  title="Instagram" href="#"><i class="fab fa-instagram"></i></a></li>
                  </ul>
                  <!-- /End Social Links -->
               </div>
               <!--/ col-lg -->
               <div class="col-lg-3">
                  <h5>About us</h5>
                  <!--divider -->
                  <hr class="small-divider left"/>
                  <p class="mt-3">Elit aenean, amet eros curabitur. Wisi ad eget ipsum metus sociis Cras enim wisi elit aenean.</p>
               </div>
               <!--/ col-lg -->
               <div class="col-lg-3">
                  <h5>Contact Us</h5>
                  <!--divider -->
                  <hr class="small-divider left"/>
                  <ul class="list-unstyled mt-3">
                     <li class="mb-1"><i class="fas fa-phone margin-icon "></i>(123) 456-789</li>
                     <li class="mb-1"><i class="fas fa-envelope margin-icon"></i><a href="mailto:email@yoursite.com">email@yoursite.com</a></li>
                     <li><i class="fas fa-map-marker margin-icon"></i>Pet Street 123 - New York </li>
                  </ul>
                  <!--/ul -->
               </div>
               <!--/ col-lg -->
               <div class="col-lg-3">
                  <h5>Working Hours</h5>
                  <!--divider -->
                  <hr class="small-divider left"/>
                  <ul class="list-unstyled mt-3">
                     <li class="mb-1">Open from 9am - 6pm</li>
                     <li class="mb-1">Holidays - Closed</li>
                     <li>Weekends - Closed</li>
                  </ul>
                  <!--/ul -->
               </div>
               <!--/ col-lg -->
            </div>
            <!--/ row-->
            <hr/>
            <div class="row">
               <div class="credits col-sm-12">
                  <p>Copyright 2019 - 2021 / Designed by <a href="http://www.ingridkuhn.com">Ingrid Kuhn</a></p>
               </div>
            </div>
            <!--/col-lg-12-->
         </div>
         <!--/ container -->
         <!-- Go To Top Link -->
         <div class="page-scroll hidden-sm hidden-xs">
            <a href="#top" class="back-to-top"><i class="fa fa-angle-up"></i></a>
         </div>
         <!--/page-scroll-->
      </footer>
      <!--/ footer-->
      <!-- Bootstrap core & Jquery -->
      <script src="vendor/jquery/jquery.min.js"></script>
      <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
      <!-- Custom Js -->
      <script src="js/custom.js"></script>
      <script src="js/plugins.js"></script>
      <!-- Prefix free -->
      <script src="js/prefixfree.min.js"></script>
      <!-- number counter script -->
      <script src="js/counter.js"></script>
      <!-- maps -->
      <script src="js/map.js"></script>
   </body>
</html>