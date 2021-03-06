var sys = require('sys'),
  assert = require('assert'),
  djs = require('../d');
  
djs.playlist('file.js', function(err, files) {
  assert.deepEqual(files, [], "No valid files");
});

djs.playlist('file0.js', function(err, files) {
  assert.deepEqual(files, ['file0.js'], "A file with no dependency");
});

djs.playlist('file1.js', function(err, files) {
  assert.deepEqual(toHash(files), toHash(['file1.js', 'empty0.js']), "A file an a first level dep (same folder)");
});

djs.playlist('file2.js', function(err, files) {
  assert.deepEqual(toHash(files), toHash(['file2.js', 'empty0.js', 'empty1.js']), "A file with two first level deps (same folder)");
});

djs.playlist('file3.js', function(err, files) {
  assert.deepEqual(toHash(files), toHash(['file3.js', 'deep0.js', 'empty0.js']), "A file with one first level and one second level dep (same folder)");
});

djs.playlist('file4.js', function(err, files) {
  assert.deepEqual(toHash(files), toHash(['file4.js', 'deep1.js', 'deep2.js', 'empty0.js', 'empty1.js', 'empty2.js', 'empty3.js']), "A file with two first level and two four second level deps (same folder)");
});

djs.playlist('file5.js', function(err, files) {
  assert.deepEqual(toHash(files), toHash(['file5.js', 'deep3.js', 'deep4.js', 'empty0.js', 'empty1.js', 'empty2.js']), "Dependency redundency on the second level");
});

djs.playlist('file6.js', function(err, files) {
  assert.deepEqual(toHash(files), toHash(['file6.js', 'deep5.js', 'empty0.js', 'empty1.js']), "Dependency redundency accross two levels");
});

djs.playlist('file7.js', function(err, files) {
  assert.deepEqual(toHash(files), toHash(['file7.js', 'folder0/empty0.js']), "Dependency in a subfolder");
});

djs.playlist('file8.js', function(err, files) {
  assert.deepEqual(toHash(files), toHash(['file8.js', 'folder0/empty0.js', 'folder0/empty1.js', 'folder1/empty0.js', 'folder1/empty1.js']), "Deps in two different subfolders");
});

djs.playlist('file9.js', function(err, files) {
  assert.deepEqual(toHash(files), toHash(['file9.js', 'folder0/deep0.js', 'folder0/empty0.js', 'folder0/empty1.js']), "Two level deps in a subfolder");
});

djs.playlist('file10.js', function(err, files) {
  assert.deepEqual(toHash(files), toHash(['file10.js', 'folder0/deep1.js', 'empty0.js', 'empty1.js']), "One first level dep in a subfolder and two second level deps in the same folder");
});

sys.log('All tests started');

// Since we are not sure about the playlist's order (shuffle mode, FTW), turn everything into a hash
function toHash(array) {
  var hash = {};
  array.forEach(function(value) {
    hash[value] = true;
  });
  return hash;
}
