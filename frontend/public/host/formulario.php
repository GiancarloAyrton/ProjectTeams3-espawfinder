<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Mascotas perdidas</title>
</head>

<body>
    <h1>Formulario de mascotas perdidas</h1>
    
    <form action="procesar_formulario.php" method="post" enctype="multipart/form-data">
        <label for="nombre">Nombre:</label><br>
        <input type="text" id="nombre" name="nombre"><br>

        <label for="raza">Raza:</label><br>
        <input type="text" id="raza" name="raza"><br>

        <label for="genero">Género:</label><br>
        <input type="radio" id="genero" name="genero" value="Macho"> Macho<br>
        <input type="radio" id="genero" name="genero" value="Hembra"> Hembra<br>
        <br>
        
        <label for="color">Color:</label>
        <input type="text" name="color" id="color">
        <br>

        <label for="descripcion">Descripción:</label>
        <textarea name="descripcion" id="descripcion" rows="5" cols="30"></textarea>
        <br>

        <label for="fecha_perdida">Fecha de pérdida:</label>
        <input type="date" name="fecha_perdida" id="fecha_perdida">
        <br>

        <label for="imagen">Imagen:</label>
        <input type="file" name="foto" id="foto">
        <img id="preview" src="#" alt="Image preview" style="display: none; height: 150px;"/>
        <br>
        
        <label for="especie">Especie:</label>
        <input type="text" name="especie" id="especie">
        <br>
        
        <label for="correo">Correo:</label>
        <input type="email" name="correo" id="correo">
        <br>
        
        <label for="nombre_dueno">Nombre del dueño:</label>
        <input type="text" name="nombre_dueno" id="nombre_dueno">
        <br>
        
        <label for="telefono">Telefono:</label>
        <input type="tel" name="telefono" id="telefono">
        <br>
        
        <label for="mensaje">Mensaje:</label>
        <textarea name="mensaje" id="mensaje" rows="5" cols="30"></textarea>
        <br>
        
        <input type="submit" value="Enviar">
    </form>
    <script>
        document.getElementById('foto').addEventListener('change', function() {
        // Obtiene el archivo seleccionado
        var file = this.files[0];
        // Verifica que el archivo sea una imagen
        if (file.type.match(/image.*/)) {
        // Crea un objeto de lectura de archivos
        var reader = new FileReader();
        // Al cargar el archivo, asigna su contenido como src del elemento img
        reader.onload = function(e) {
            document.getElementById('preview').src = e.target.result;
            document.getElementById('preview').style.display = 'block';
        }
        // Lee el archivo
        reader.readAsDataURL(file);
        } else {
        // Muestra un mensaje de error si el archivo no es una imagen
        alert('Por favor seleccione un archivo de imagen.');
        }
    });
    </script>
    <h1>Mascotas perdidas</h1>

    

</body>

</html>