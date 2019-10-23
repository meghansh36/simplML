#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import matplotlib.pyplot as plt
import matplotlib
import json
import numpy as np
import pandas as pd
import sklearn.metrics as sm
from matplotlib.colors import ListedColormap
from sklearn.metrics import confusion_matrix
from sklearn import preprocessing
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.metrics import confusion_matrix
from sklearn.model_selection import train_test_split
# matplotlib.rcParams.update({'font.size': 22})


# In[ ]:


df = pd.read_csv('/Users/savi/.Trash/Social_Network_Ads.csv')


# In[ ]:


X = df.iloc[:,:-1].values
y = df.iloc[:, -1].values


# In[ ]:


sc = preprocessing.StandardScaler()
X = sc.fit_transform(X)


# In[ ]:


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.20, random_state = 0)


# In[ ]:


classifier = SVC(kernel ='rbf', random_state = None)
classifier.fit(X_train, y_train)
y_pred = classifier.predict(X_test)


# In[ ]:


accuracy = sm.accuracy_score(y_test,y_pred)
precision = sm.precision_score(y_test,y_pred,average='macro')
f1 = sm.f1_score(y_test,y_pred,average='macro')
recall = sm.recall_score(y_test,y_pred,average='macro')
cm_scores = { 'accuracy': accuracy, 'precision': precision, 'recall': recall, 'f1': f1  }
print(json.dumps(cm_scores))


# In[ ]:


X_set, y_set = X_train, y_train
X1, X2 = np.meshgrid(np.arange(start = X_set[:, 0].min() - 1, stop = X_set[:, 0].max() + 1, step = 0.01), np.arange(start = X_set[:, 1].min() - 1, stop = X_set[:, 1].max() + 1, step = 0.01))
plt.contourf(X1, X2, classifier.predict(np.array([X1.ravel(), X2.ravel()]).T).reshape(X1.shape), alpha = 0.75, cmap = ListedColormap(('red', 'green')))
plt.xlim(X1.min(), X1.max())
plt.ylim(X2.min(), X2.max())
for i, j in enumerate(np.unique(y_set)):
	plt.scatter(X_set[y_set == j, 0], X_set[y_set == j, 1], c = ListedColormap(('red', 'green'))(i), label = j)
plt.title('Awesome Model')
plt.xlabel('Input Parameters')
plt.ylabel('Output Parameters')
plt.legend()
plt.show()

