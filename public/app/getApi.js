let dataApp;
const urlGetApi = 'http://localhost:3000/api/products';
fetch(urlGetApi)
.then((response) => {
  return response.json();
})
.then((data) => {
  dataApp = JSON.parse(JSON.stringify(data));
});
