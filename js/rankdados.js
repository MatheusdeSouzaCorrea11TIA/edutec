let nome = sessionStorage.getItem("username")
let pontos = sessionStorage.getItem("points")

fetch('/api/setData?nome=Matheus', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, pontos })
})
  .then(res => res.json())
  .then(data => {
    console.log('Ranking:', data);
  })
  .catch(err => console.error(err));