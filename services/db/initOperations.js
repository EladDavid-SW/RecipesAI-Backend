const dbHelper = require('./dbHelper');
const queries = require('./queries');

async function main() {
  try {

    // Retrieve an image by ID
    const queryObj = queries.getImageById('yourImageId');
    const result = await dbHelper.query(queryObj);

    console.log('Result:', result);


  } catch (err) {
    console.error('An error occurred:', err);
  }
}

main();
