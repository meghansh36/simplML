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

module.exports = {
    getPreview
}