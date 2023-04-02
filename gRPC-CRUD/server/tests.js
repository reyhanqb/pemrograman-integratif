const client = require('./client')

// client.getBooks({}, (error, books) => {
//     if(error)
//         throw error;

//     console.log(books)
// })

const request = { id: 1 };
client.getBooks(request, (error, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log(response.data);
  }
});