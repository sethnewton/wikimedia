// Include the cluster module
var cluster = require('cluster');

// Code to run if we're in the master process
if (cluster.isMaster) {

    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

// Code to run if we're in a worker process
} else {

    // Include Express
    var express = require('express');
    var multer = require('multer');
    var fs = require('fs');

    // Create a new Express application
    var app = express();
    app.use(multer({ 
      dest: './uploads/',
      rename: function (fieldname, filename) {
        return "Latest_plane_crash" + '-' + Date.now() + '-' + random(1,10);
      },
      onFileUploadComplete: function (file, req, res) {
        // cp  file.path data/Latest_plane_crash
        fs.createReadStream(file.path).pipe(fs.createWriteStream('data/Latest_plane_crash'));
      }
    }));

    // Retrieve our file.  Cheating on the route for now, would be more complex if this were a true API.
    app.get('/get/Latest_plane_crash', function (req, res) {
      console.log(fibonacci(34));
      fs.readFile('data/Latest_plane_crash', function(err, data) {
        if(err) throw err;
        res.send(data);
        console.log(data);
      });
      // Return the file
    });

    // Write to our file on a post.
    app.post('/post/Latest_plane_crash',[ multer(), function(req, res){
      console.log(req.body) // form fields
      console.log(req.files) // form files
      res.send('Completed');
    }]);

    // Bind to a port
    app.listen(3000);
    console.log('Application running!' + cluster.worker.id);

    function fibonacci(number) {
      if(number == 0)
        return 0;
      else if(number == 1)
        return 1;
      else
        return fibonacci(number - 1) + fibonacci(number - 2);
    }

    function random (low, high) {
      return Math.random() * (high - low) + low;
    }
}
