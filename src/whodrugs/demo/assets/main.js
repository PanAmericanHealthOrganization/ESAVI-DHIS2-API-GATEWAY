(() => {
  console.log('aquí');
  drugInput = document.getElementById('browsers');
  drugInput.addEventListener('onkeyup', (event) => {
    console.log(event.target.value);
  });
})();
