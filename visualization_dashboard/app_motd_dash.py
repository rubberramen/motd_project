# go 연령별 서브 플롯 * 연령별 서브 플롯

from dash import Dash, dcc, html, Input, Output
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go  
import db
from plotly.subplots import make_subplots


external_stylesheets = ['https://codepen.io/chriddyp/pen/bWLwgP.css']


app = Dash(__name__, external_stylesheets=external_stylesheets)

# ---- DB 이용해서 DF 만들기  --------------

data = db.selectAll()  
df = pd.DataFrame(data)
df = df.set_index('id')


#====== 파스텔 색상 리스트======================================

pastel1_colors = ['rgb(251,180,174)', 'rgb(179,205,227)', 'rgb(204,235,197)', 
                 'rgb(222,203,228)', 'rgb(254,217,166)', 'rgb(255,255,204)', 
                 'rgb(229,216,189)', 'rgb(253,218,236)', 'rgb(242,242,242)']

#====== 라벨 : 스타일 별 ======================================

labels = df['result_style'].value_counts().index

# ====================================================================
# 전체 스타일
# ====================================================================

fig_tot_style = go.Figure(data=[go.Pie(labels=df['result_style'].value_counts().index,  
                             values=df['result_style'].value_counts(), 
                             marker_colors=pastel1_colors)])



# fig_tot_style.update_traces(  
#                   textinfo='label+percent', 
#                   textfont_size=13
#                   )

fig_tot_style.update_traces(hole=.35, textinfo='label')   # hoverinfo="label+percent+name",

# fig_tot_style.update(layout_title_text='<전체 스타일 파이차트>', 
#            layout_showlegend=True)


fig_tot_style.update_layout(
    title_text="👗전체 스타일 파이차트👖")

# ===== 성별 서브 플롯 1 * 2 ===============

fig_gender = make_subplots(rows=1, cols=2, specs=[[{'type':'domain'}, {'type':'domain'}]],
                           subplot_titles=['<남자 스타일>', '<여자 스타일>'])
fig_gender.add_trace(go.Pie(labels=labels, values=df['result_style'].groupby(df['gender']).value_counts()['남자'], 
                     name="남자",
                     marker_colors=pastel1_colors),
              1, 1)
fig_gender.add_trace(go.Pie(labels=labels, values=df['result_style'].groupby(df['gender']).value_counts()['여자'], 
                     name="여자",
                     marker_colors=pastel1_colors),
              1, 2)

# Use `hole` to create a donut-like pie chart
fig_gender.update_traces(hole=.35, textinfo='label')  # textinfo='label+percent'

fig_gender.update_layout(
    title_text="👨성별 스타일👩")


# ===== 연령별 서브 플롯 2 * 4 ===============

fig = make_subplots(rows=2, cols=4, 
                    specs=[[{'type':'domain'}, {'type':'domain'}, {'type':'domain'}, {'type':'domain'}],[{'type':'domain'}, {'type':'domain'}, {'type':'domain'}, {'type':'domain'}]],
                    subplot_titles=['10대 미만', '10대', '20대', '30대', '40대', '50대', '60대 이상'])

fig.add_trace(go.Pie(labels=labels, values=df['result_style'].groupby(df['age']).value_counts()['10대미만'], 
                     name="10대미만",
                     marker_colors=pastel1_colors),
              1, 1)
fig.add_trace(go.Pie(labels=labels, values=df['result_style'].groupby(df['age']).value_counts()['10대'], 
                     name="10대",
                     marker_colors=pastel1_colors),
              1, 2)
fig.add_trace(go.Pie(labels=labels, values=df['result_style'].groupby(df['age']).value_counts()['20대'], 
                     name="20대",
                     marker_colors=pastel1_colors),
              1, 3)
fig.add_trace(go.Pie(labels=labels, values=df['result_style'].groupby(df['age']).value_counts()['30대'], 
                     name="30대",
                     marker_colors=pastel1_colors),
              1, 4)

fig.add_trace(go.Pie(labels=labels, values=df['result_style'].groupby(df['age']).value_counts()['40대'], 
                     name="40대",
                     marker_colors=pastel1_colors),
              2, 1)

fig.add_trace(go.Pie(labels=labels, values=df['result_style'].groupby(df['age']).value_counts()['50대'], 
                     name="50대",
                     marker_colors=pastel1_colors),
              2, 2)

fig.add_trace(go.Pie(labels=labels, values=df['result_style'].groupby(df['age']).value_counts()['60대이상'], # 60대가 에러나서
                     name="60대이상",
                     marker_colors=pastel1_colors),
              2, 3)

fig.update_traces(hole=.35, textinfo='label')

fig.update_layout(
    title_text="🚶‍♀️연령별 스타일🏃‍♂️")

# ========= 레이 아웃 ====================================================

app.layout = html.Div([
    html.H3('👔#motd \t <Dashboard>'),
    dcc.Graph(id="graph__", figure=fig_tot_style),
    dcc.Graph(id="graph", figure=fig_gender),
    dcc.Graph(id="graph_01", figure=fig)
])


# ===== 서버 구동 / port : 8922 ==============

app.run_server(debug=True, port=8922)