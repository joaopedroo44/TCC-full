document.addEventListener('DOMContentLoaded', function () {
    const senhaInput = document.getElementById('senha','Senha');
    const toggleBtn = document.getElementById('toggleSenha');
  
    toggleBtn.addEventListener('click', function (e) {  
      e.preventDefault();   
  
      if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        toggleBtn.textContent = 'Ocultar';
      } else {
        senhaInput.type = 'password';
        toggleBtn.textContent = 'Mostrar';
      }
    });
  });  