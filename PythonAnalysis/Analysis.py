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

print(df.columns.values)
enc = LabelEncoder()

raw_list = []
legend = {}
for column in non_int_columns:
    legend[column] = df[column].unique()
    for item in df[column].unique():
        raw_list.append(item)
    enc.fit(df[column].unique())
    print(enc.classes_)
    df[column] = enc.transform(df[column])





true_legend = [*legend["Gender"],*legend["Element"], *legend["Weapon"], *legend["Region"]]

f = dict(true_legend)
m = dict(true_legend)
k = dict(true_legend)
for column in non_int_columns:
    for val in df[column].unique():
        a = legend[column]

        weight = df[df[column] == val].shape[0]/len(df)
        f.update(val, np.mean((df.loc[df[column] == val, 'f_avg']).to_numpy())*weight)
        m.update(val, np.mean((df.loc[df[column] == val, 'm_avg']).to_numpy())*weight)
        k.update(val, np.mean((df.loc[df[column] == val, 'k_avg']).to_numpy())*weight)
print(f)

fig = plt.figure(figsize=(18,12))
gs = fig.add_gridspec(2,2)
gs.update(wspace=0.5, hspace=0.25)
ax0 = fig.add_subplot(gs[0,0])
ax1 = fig.add_subplot(gs[0,1])
ax2 = fig.add_subplot(gs[1,0])
ax3 = fig.add_subplot(gs[1,1])

# Title of the plot
ax0.spines["bottom"].set_visible(False)
ax0.spines["left"].set_visible(False)
ax0.spines["top"].set_visible(False)
ax0.spines["right"].set_visible(False)
ax0.tick_params(left=False, bottom=False)
ax0.set_xticklabels([])
ax0.set_yticklabels([])
ax0.text(0.5,0.5,
         'Mean plots \n_________________',
         horizontalalignment='center',
         verticalalignment='center',
         fontsize=22, fontweight='bold',
         fontfamily='cursive',
         color="#000000")

ax1.text(0.4, 480, 'F', fontsize=14, fontweight='bold', fontfamily='cursive', color="#001B48")
ax1.grid(color='#000000', linestyle=':', axis='y', zorder=0,  dashes=(1,5))
chart = sns.barplot(true_legend, f, ax=ax1)
chart.set(title='F Average')
chart.set_xticklabels(chart.get_xticklabels(), rotation=45, horizontalalignment='right')

ax2.text(0.4, 480, 'M', fontsize=14, fontweight='bold', fontfamily='cursive', color="#001B48")
ax2.grid(color='#000000', linestyle=':', axis='y', zorder=0,  dashes=(1,5))
chart = sns.barplot(true_legend, m, ax=ax2)
chart.set(title='M Average')
chart.set_xticklabels(chart.get_xticklabels(), rotation=45, horizontalalignment='right')
ax3.text(0.4, 480, 'K', fontsize=14, fontweight='bold', fontfamily='cursive', color="#001B48")
ax3.grid(color='#000000', linestyle=':', axis='y', zorder=0,  dashes=(1,5))

chart = sns.barplot(true_legend, k, ax=ax3)
chart.set(title='K Average')
chart.set_xticklabels(chart.get_xticklabels(), rotation=45, horizontalalignment='right')
for s in ["top","right","left"]:
    ax1.spines[s].set_visible(False)
    ax2.spines[s].set_visible(False)
    ax3.spines[s].set_visible(False)
raw_data = {}

vals = []
for item in raw_list:
    vals.append(item)
    vals.append(item)
    vals.append(item)

raw_data['x'] = vals


vals = []
for index in range(len(f)):
    vals.append(f[index])
    vals.append(m[index])
    vals.append(k[index])

raw_data['y'] = vals

raw_data['category'] = ["F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K",
"F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K",
"F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K", "F", "M", "K"]
#for index in range(len(non_int_columns)):
  #  data[non_int_columns[index]] = [f[index], m[index], k[index]]

print(raw_data)
#sns.barplot(x='x', y='y', hue='category', data=raw_data)
plt.show()