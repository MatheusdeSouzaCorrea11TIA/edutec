async function getData() {
    const res = await fetch("https://script.google.com/macros/s/AKfycbwgrGP2cX13nOQA0xO1nKnW1lvIdiELHvhYGzq5zj_J-l7f7Txjiv-1QN6QhOQgVWhA/exec");
    const data = await res.json();
    console.log(data);
}
  
getData()
  