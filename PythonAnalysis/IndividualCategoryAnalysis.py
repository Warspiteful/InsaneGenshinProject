import numpy as np # linear algebra
import sklearn

import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.preprocessing import LabelEncoder

file_path = "PythonAnalysis/Genshin_DB.csv"
df = pd.read_csv(file_path)
df.drop(['ID','charName', 'title', 'Image'], axis = 1, inplace = True )


non_int_columns = ["Gender", "Element", "Weapon", "Region"]
enc = LabelEncoder()

raw_list = []
legend = {}
for column in non_int_columns:
    legend[column] = df[column].unique()
    for item in df[column].unique():
        raw_list.append(item)
    enc.fit(df[column].unique())
    df[column] = enc.transform(df[column])


gender = df.drop(columns  = ['Element','Weapon','Region'])

filt = (df['Gender'] == 0)
print(filt)
