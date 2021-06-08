const fs = require('fs');
const path = require('path');

const imgData = 'monImage.jpg';

// fs.writeFile(imgData + Date() + 'test.png', imgData, 'binary', function (err) {
//   if (err) throw err;
//   console.log('Saved!');
// });

fs.mkdir('/uploads', { recursive: false }, (err) => {
  if (err) throw err;
});
