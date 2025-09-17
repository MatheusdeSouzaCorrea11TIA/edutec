fetch('/api/getData?nome=Matheus')
  .then(res => res.json())
  .then(data => {
    console.log('Ranking:', data);
  })
  .catch(err => console.error(err));