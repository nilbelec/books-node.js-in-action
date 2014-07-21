var events = require('events')
    , util = require('util');

function Watcher(watchDir, doneDir){
    this.watchDir = watchDir;
    this.processedDir = doneDir;
}

util.inherits(Watcher, events.EventEmitter);

Watcher.prototype.watch = function (){
    var watcher = this;
    fs.readdir(this.watchDir, function(err, files){
        if (err) throw err;
        for (var index in files){
            watcher.emit('process', files[index]);
        }
    });
};

Watcher.prototype.start = function(){
    var watcher = this;
    fs.watchFile(this.watchDir, function(){
        watcher.watch();
    });
};


var fs = require('fs')
    , watchDir = './watch'
    , processedDir = './done';



var watcher = new Watcher(watchDir, processedDir);

watcher.on('process', function process(file){
    var watchFile = this.watchDir + '/' + file;
    var processFile = this.processedDir + '/' + file.toLowerCase();

    fs.rename(watchFile, processFile, function(err){
        if (err) throw err;
    });
});