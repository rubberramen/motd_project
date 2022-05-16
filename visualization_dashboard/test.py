import db
import pandas as pd

result = db.selectAll()

data = db.selectAll()  
df = pd.DataFrame(data)
df = df.set_index('id')

# print(df.head(5))
print()
# df['result_style'].groupby(df['age']).value_counts()
print(df['result_style'].groupby(df['age']).value_counts())
