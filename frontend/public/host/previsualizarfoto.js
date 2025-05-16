function previsualizarFoto() {
    var foto = document.getElementById('foto');
    var previsualizacion = document.getElementById('previsualizacion');
  
    if (foto.files && foto.files[0]) {
      var reader = new FileReader();
  
      reader.onload = function(e) {
        previsualizacion.src = e.target.result;
      }
  
      reader.readAsDataURL(foto.files[0]);
    }
  }