// module.exports = {
//   getMovies: () => {
//     return fetch('/api/movies')
//       .then(response => response.json());
//   }
// };


const getMovies = () => {
  document.querySelector('#mcurtain').setAttribute("checked","");
  return fetch('/api/movies')
    .then(response => response.json());
};

// let movieEdit = () => {
//   let dropdownValue = document.querySelector('#current-movie').value;
//   console.log(dropdownValue);
// }

export {getMovies};