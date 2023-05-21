const client = require('./client')

client.getBooks({}, (err, response) => {
  if (err) {
    console.error(err);
  } else {
    console.log(response.books);
  }
});
