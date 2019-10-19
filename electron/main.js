const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron')
const process_handler = require('./cpHandler');
const fs = require('fs')
let win;

async function createWindow () {
  
  
  // Create the browser window.
  win = new BrowserWindow({
    width: 1300, 
    height: 1300,
    icon: `file://${__dirname}/../dist/assets/logo.png`,
    webPreferences: {
      nodeIntegration: true,
    }
  })
  
  globalShortcut.register('CommandOrControl+R', () => {
    win.loadURL(`file://${__dirname}/../dist/index.html`)
  });


  globalShortcut.register('F5', () => {
    win.loadURL(`file://${__dirname}/../dist/index.html`)
  });

  win.loadURL(`file://${__dirname}/../dist/index.html`)
  win.maximize()
  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
}

// Create window on electron intialization
app.on('ready', createWindow)

ipcMain.on('fetch-preview', async (event, filename) => {
  let html = await process_handler.getPreview(filename);
  let previewWindow = new BrowserWindow({
    width: 600,
    height: 400,
    center: true,
  });
  previewWindow.setMenu(null);
  previewWindow.loadURL('data:text/html;charset=UTF-8,' + encodeURIComponent(html));
  previewWindow.on("closed", function() {
    previewWindow = null;
  });
})

/* Import Data - CSV */
function data_csv(node_data) {
  
  let cell = {
    "cell_type": "code",
    "execution_count": null,
    "metadata": {},
    "outputs": [],
    "source": [
        "df = pd.read_csv('" + node_data.path +"')\n",
        "X = df.iloc[:,:-1].values\n",
        "y = df.iloc[:, -1].values\n"
    ]
  };
  return cell;
}

/* Import Data - JSON */
function data_json(node_data) {
  
  let cell = {
    "cell_type": "code",
    "execution_count": null,
    "metadata": {},
    "outputs": [],
    "source": [
        "df = pd.io.json.json_normalize('" + node_data.path +"')\n",
        "X = df.iloc[:,:-1].values\n",
        "y = df.iloc[:, -1].values\n"
    ]
  };

  return cell;
}

/* Import Data - HTML */
function data_html(node_data) {
  
  let cell = {
    "cell_type": "code",
    "execution_count": null,
    "metadata": {},
    "outputs": [],
    "source": [
        "df = pd.read_html('" + node_data.path +"')[0]\n",
        "X = df.iloc[:,:-1].values\n",
        "y = df.iloc[:, -1].values\n"
    ]
  };
  return cell;
}

/* Import Data - Excel */
function data_excel(node_data) {
  
  let cell = {
    "cell_type": "code",
    "execution_count": null,
    "metadata": {},
    "outputs": [],
    "source": [
        "df = pd.read_excel('" + node_data.path +"')\n",
        "X = df.iloc[:,:-1].values\n",
        "y = df.iloc[:, -1].values\n"
    ]
  };
  return cell;
}


/* Processing - FillNa */
function processing_fillna(node_data) {

  replace_with = (node_data.replace_with) ? ("\'" + node_data.replace_with + "\'") : (0) //Either 0 or string
  method = (node_data.method) ? ("\'" + node_data.method + "\'") : ("None")  //Either none or string
  limit = (node_data.limit) ? (node_data.limit) : ("None")    //Always a number

  let cell = {
    "cell_type": "code",
    "execution_count": null,
    "metadata": {},
    "outputs": [],
    "source": [
        "X.fillna("+ replace_with +", method="+method+", inplace=True, limit="+limit+")\n",
        "Y.fillna("+ replace_with +", method="+method+", inplace=True, limit="+limit+")\n",
    ]
  };
  return cell;
}

/* Processing - DropNa */
function processing_drop(node_data) {

  axis = (node_data.axis) ? (node_data.axis) : (0) //Always a number
  how = (node_data.how) ? ("\'" + node_data.how + "\'") : ("\'any\'") //Always a string

  let cell = {
    "cell_type": "code",
    "execution_count": null,
    "metadata": {},
    "outputs": [],
    "source": [
        "X.dropna(axis="+ axis +", how="+ how +", inplace=True)\n",
        "Y.dropna(axis="+ axis +", how="+ how +", inplace=True)\n",
    ]
  };
  return cell;
}

/* Processing - Standardization */
function processing_standardize(node_data) {
  let cell = {
    "cell_type": "code",
    "execution_count": null,
    "metadata": {},
    "outputs": [],
    "source": [
        "sc = preprocessing.StandardScaler()\n",
        "X = sc.fit_transform(X)\n",
        "Y = sc.fit_transform(Y)\n"
    ]
  };
  return cell;
}

/* Processing - Scaling */
function processing_scaling(node_data) {
  let cell = {
    "cell_type": "code",
    "execution_count": null,
    "metadata": {},
    "outputs": [],
    "source": [
        "mm_scaler = preprocessing.MinMaxScaler()\n",
        "X = mm_scaler.fit_transform(X)\n",
        "Y = mm_scaler.fit_transform(Y)\n",
    ]
  };
  return cell;
}

/* Processing - One hot encoding */
function processing_ohe(node_data) {

  categorical_features = (node_data.categorical_features) ? (node_data.categorical_features) : ("all")

  let cell = {
    "cell_type": "code",
    "execution_count": null,
    "metadata": {},
    "outputs": [],
    "source": [
        "onehotencoder = preprocessing.OneHotEncoder(categorical_features = "+categorical_features+")\n",
        "X = onehotencoder.fit_transform(X).to_array()\n",
        "Y = onehotencoder.fit_transform(Y).to_array()\n",
    ]
  };
  return cell;
}

/* Train Test Split */ 
function train_test_split() {

  let cell = {
    "cell_type": "code",
    "execution_count": null,
    "metadata": {},
    "outputs": [],
    "source": [
        "X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size = 0.20, random_state = 0)\n",
    ]
  };
  return cell;
}

/* Learners - random_forest */
function learner_RF(node_data) {

  n_estimators = (node_data.n_estimators) ? (node_data.n_estimators) : (10) //Always number
  criterion = (node_data.criterion) ? ("\'" + node_data.criterion + "\'") : ("gini") //Always string
  random_state = (node_data.random_state) ? (node_data.random_state) : ("None") //Either number or none

  let cell = {
    "cell_type": "code",
    "execution_count": null,
    "metadata": {},
    "outputs": [],
    "source": [
        "classifier = RandomForestClassifier(n_estimators ="+ n_estimators +", criterion = "+ criterion +", random_state = "+ random_state +")\n",
        "classifier.fit(X_train, y_train)\n",
        "y_pred = classifier.predict(X_test)\n",
    ]
  };
  return cell;
}  

/* Learners - SVM */
function learner_SVM(node_data) {

  kernel = (node_data.kernel) ? ("\'" + node_data.kernel + "\'") : ("\'rbf\'") //Always string
  random_state = (node_data.random_state) ? (node_data.random_state) : ("None") //Either number or none

  let cell = {
    "cell_type": "code",
    "execution_count": null,
    "metadata": {},
    "outputs": [],
    "source": [
        "classifier = SVC(kernel ="+ kernel +", random_state = "+ random_state +")",
        "classifier.fit(X_train, y_train)\n",
        "y_pred = classifier.predict(X_test)\n",
    ]
  };
  return cell;
}

ipcMain.on('generate-python-code', async (event, nodes) => {
  
  let ipy = JSON.parse(fs.readFileSync("./ipynb-files/initial.ipynb", "utf-8"))

  nodes.forEach(node => {
    let type = node.id

    if(type == "start" || type == "end") return;

    if(node.parentCategory == "learner") {
      let new_cell = train_test_split()
      ipy["cells"].push(new_cell)
    }

    let new_cell = eval(type)(node.data)  //Node id should match the function name
    ipy["cells"].push(new_cell)
  })

  fs.writeFileSync("./ipynb-files/test.ipynb", JSON.stringify(ipy));

  let html = await process_handler.getPreview('test');
  let previewWindow = new BrowserWindow({
    width: 600,
    height: 400,
    center: true,
  });
  previewWindow.setMenu(null);
  previewWindow.loadURL('data:text/html;charset=UTF-8,' + encodeURIComponent(html));
  previewWindow.on("closed", function() {
    previewWindow = null;
  });
  

})
