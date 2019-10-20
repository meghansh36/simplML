const { app, BrowserWindow, ipcMain, globalShortcut, dialog } = require('electron')
const process_handler = require('./cpHandler');
const fs = require('fs')
const os = require('os')
const path = require('path')
const {spawn} = require('child_process')
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
        "df = pd.read_csv('" + node_data.path +"')\n"
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
        "df = pd.read_html('" + node_data.path +"')[0]\n"
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
        "df = pd.read_excel('" + node_data.path +"')\n"
    ]
  };
  return cell;
}


/* Transforming - FillNa */
function transforming_fillna(node_data) {

  replace_with = (node_data.replace_with) ? ("\'" + node_data.replace_with + "\'") : (0) //Either 0 or string
  method = (node_data.method) ? ("\'" + node_data.method + "\'") : ("None")  //Either none or string
  limit = (node_data.limit) ? (node_data.limit) : ("None")    //Always a number

  let cell = {
    "cell_type": "code",
    "execution_count": null,
    "metadata": {},
    "outputs": [],
    "source": [
        "df.fillna("+ replace_with +", method="+method+", inplace=True, limit="+limit+")\n",
    ]
  };
  return cell;
}

/* Transforming - DropNa */
function transforming_drop(node_data) {

  axis = (node_data.axis) ? (node_data.axis) : (0) //Always a number
  how = (node_data.how) ? ("\'" + node_data.how + "\'") : ("\'any\'") //Always a string

  let cell = {
    "cell_type": "code",
    "execution_count": null,
    "metadata": {},
    "outputs": [],
    "source": [
        "df.dropna(axis="+ axis +", how="+ how +", inplace=True)\n",
    ]
  };
  return cell;
}

/* XY Split */
function XY_split() {
  let cell = {
    "cell_type": "code",
    "execution_count": null,
    "metadata": {},
    "outputs": [],
    "source": [
        "X = df.iloc[:,:-1].values\n",
        "y = df.iloc[:, -1].values\n",
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
        "X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.20, random_state = 0)\n",
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
    ]
  };
  return cell;
}

/* Processing - One hot encoding */
function processing_ohe(node_data) {

  categorical_features = (node_data.categorical_features) ? (node_data.categorical_features) : ("\'all\'")

  let cell = {
    "cell_type": "code",
    "execution_count": null,
    "metadata": {},
    "outputs": [],
    "source": [
        "onehotencoder = preprocessing.OneHotEncoder(categorical_features = "+categorical_features+")\n",
        "X = onehotencoder.fit_transform(X).toarray()\n",
    ]
  };
  return cell;
}

/* Learners - random_forest */
function learner_RF(node_data) {

  n_estimators = (node_data.n_estimators) ? (node_data.n_estimators) : (10) //Always number
  criterion = (node_data.criterion) ? ("\'" + node_data.criterion + "\'") : ("\'gini\'") //Always string
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
        "classifier = SVC(kernel ="+ kernel +", random_state = "+ random_state +")\n",
        "classifier.fit(X_train, y_train)\n",
        "y_pred = classifier.predict(X_test)\n",
    ]
  };
  return cell;
}

function evaluation_cm() {
  let cell = {
    "cell_type": "code",
    "execution_count": null,
    "metadata": {},
    "outputs": [],
    "source": [
        "accuracy = sm.accuracy_score(y_test,y_pred)\n",
        "precision = sm.precision_score(y_test,y_pred,average='macro')\n",
        "f1 = sm.f1_score(y_test,y_pred,average='macro')\n",
        "recall = sm.recall_score(y_test,y_pred,average='macro')\n",
        "cm_scores = { 'accuracy': accuracy, 'precision': precision, 'recall': recall, 'f1': f1  }\n", 
        "print(json.dumps(cm_scores))\n",
    ]
  };
  return cell;
}

function chart_gen() {
  let cell = {
    "cell_type": "code",
    "execution_count": null,
    "metadata": {},
    "outputs": [],
    "source": [
      "X_set, y_set = X_train, y_train\n",
      "X1, X2 = np.meshgrid(np.arange(start = X_set[:, 0].min() - 1, stop = X_set[:, 0].max() + 1, step = 0.01), np.arange(start = X_set[:, 1].min() - 1, stop = X_set[:, 1].max() + 1, step = 0.01))\n",
      "plt.contourf(X1, X2, classifier.predict(np.array([X1.ravel(), X2.ravel()]).T).reshape(X1.shape), alpha = 0.75, cmap = ListedColormap(('red', 'green')))\n",
      "plt.xlim(X1.min(), X1.max())\n",
      "plt.ylim(X2.min(), X2.max())\n",
      "for i, j in enumerate(np.unique(y_set)):\n",
      "\tplt.scatter(X_set[y_set == j, 0], X_set[y_set == j, 1], c = ListedColormap(('red', 'green'))(i), label = j)\n",
      "plt.title('Awesome Model')\n",
      "plt.xlabel('Input Parameters')\n",
      "plt.ylabel('Output Parameters')\n",
      "plt.legend()\n",
      "plt.show()\n"
    ]
  };
  return cell;
}

ipcMain.on('generate-python-code', async (event, nodes) => {
  
  let ipy = JSON.parse(fs.readFileSync("./ipynb-files/initial.ipynb", "utf-8"))
  let split_in_xy = false
  let split_in_train_test = false

  nodes.forEach(node => {
    let type = node.id

    if(type == "start" || type == "end") return;

    //Split in XY
    if(node.data.parentCategory == "processing" && !split_in_xy) {
      let new_cell = XY_split()
      ipy["cells"].push(new_cell)
      split_in_xy = true
    }

    //Split in train/test
    if(node.data.parentCategory == "learner" && !split_in_train_test) {
      let new_cell = train_test_split()
      ipy["cells"].push(new_cell)
      split_in_train_test = true
    }

    let new_cell = eval(type)(node.data)  //Node id should match the function name
    ipy["cells"].push(new_cell)

    //Confusion Matrix
    if(node.data.parentCategory == "learner") {
      let new_cell = evaluation_cm()
      ipy["cells"].push(new_cell)
      new_cell = chart_gen()
      ipy["cells"].push(new_cell)
    }

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

  event.reply('generate-python-code-success')
})

ipcMain.on('run-python-code', async (event, nodes) => {
  let ipy = JSON.parse(fs.readFileSync("./ipynb-files/initial.ipynb", "utf-8"))
  let split_in_xy = false
  let split_in_train_test = false

  nodes.forEach(node => {
    let type = node.id

    if(type == "start" || type == "end") return;

    //Split in XY
    if(node.data.parentCategory == "processing" && !split_in_xy) {
      let new_cell = XY_split()
      ipy["cells"].push(new_cell)
      split_in_xy = true
    }

    //Split in train/test
    if(node.data.parentCategory == "learner" && !split_in_train_test) {
      let new_cell = train_test_split()
      ipy["cells"].push(new_cell)
      split_in_train_test = true
    }

    let new_cell = eval(type)(node.data)  //Node id should match the function name
    ipy["cells"].push(new_cell)

    //Confusion Matrix & chart
    if(node.data.parentCategory == "learner") {
      let new_cell = evaluation_cm()
      ipy["cells"].push(new_cell)
      new_cell = chart_gen()
      ipy["cells"].push(new_cell)
    }
  })
  fs.writeFileSync("./ipynb-files/test.ipynb", JSON.stringify(ipy))
  //Generate Python file
  let stdout = await process_handler.generateAndRunPy('test')
  console.log("stdout",stdout)
  let parsedOutput =  JSON.parse(stdout);
  event.reply('run-python-code-output', parsedOutput)

})

ipcMain.on('open-browse-dialog', async (event) => {
  console.log('here')
  let paths = dialog.showOpenDialogSync({
    defaultPath: `${os.homedir()}${path.sep}Desktop`,
  })

  console.log(paths);
  if(paths.length > 0)
    event.returnValue = {path: paths[0], sep: path.sep};
  else
    event.returnValue = undefined;
})

ipcMain.on('get-csv-string', async (event, path) => {
  let content = fs.readFileSync(path, {encoding: 'utf-8'})
  event.returnValue = content;
})