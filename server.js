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
    var fs = require('fs');

    // Create a new Express application
    var app = express();

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
    app.post('/post/Latest_plane_crash', function (req, res) {
        res.send('POST');
    });

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
}
