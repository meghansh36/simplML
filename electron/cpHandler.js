var fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

function execute(command) {
    return exec(command);
};

async function getPreview(filename) {

    try {
        if(!fs.existsSync('./ipynb-files/${filename}.html')) {
            const {stdout, stderr} = await execute(`ipython nbconvert --to html ./ipynb-files/${filename}.ipynb`);
        }
        var html = fs.readFileSync(`./ipynb-files/${filename}.html`, 'utf8');
        return html;
    } catch (error) {
        console.log(error)
    }

}

async function generateAndRunPy(filename) {
    try {
        
        if(fs.existsSync(`./ipynb-files/${filename}.py`)){
            fs.unlinkSync(`./ipynb-files/${filename}.py`)
        }
        const {stdout_convert, stderr_convert} = await execute(`jupyter nbconvert --to python ./ipynb-files/${filename}.ipynb`)
       

        const {stdout, stderr} = await execute(`python ./ipynb-files/${filename}.py`)
        
        // if(stderr) {
        //     console.log("inside strerr", stderr)
        //     throw stderr
        // }

        return stdout
        
    } catch (err) {
        console.log("caught",err)
    }
}

module.exports = {
    getPreview,
    generateAndRunPy
}