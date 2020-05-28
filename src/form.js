// export const formClick = () =>{
//     let mTitle = document.querySelector('#title').value;
//     let mRate = document.querySelector('#rating').value;
//     document.querySelector('#movieBtn').addEventListener("click", function (e) {
//         e.preventDefault();
//         var movieInput = {
//             title: mTitle,
//             rating: mRate,
//             id: movies.length + 1
//         }
//         var URL = "/url/movies";
//         var options = {
//             method: "POST",
//             headers: {"Content-Type": "application/JSON"},
//             body: JSON.stringify(movieInput)
//
//         }
//         fetch(URL, options).then(response => response.JSON).then(movies => console.log(movies))
//     });
//
// }