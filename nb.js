var fs = require('fs');
var app = require('express')();
const exec = require('child_process').exec;

function execute(command, callback) {
    exec(command, (error, stdout, stderr) => {
        callback(stdout);
    });
};

app.get('/preview', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    execute('ipython nbconvert --to html sample.ipynb', (output) => {
        var html = fs.readFileSync('./sample.html', 'utf8');
        res.status(200).send(html);

    });
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});