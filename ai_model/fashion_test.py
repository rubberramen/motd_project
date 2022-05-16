from unicodedata import category
import numpy as np
from pytest import Instance
from sklearn import datasets
from tensorflow.python.keras.models import load_model
from flask import Flask, render_template, request, jsonify, url_for
from PIL import Image
import os, glob, time
from sklearn.model_selection import train_test_split
from keras.models import Sequential
from keras.layers import MaxPooling2D
from keras.layers import Conv2D
from keras.layers import Activation, Dropout, Flatten, Dense
from keras.layers import BatchNormalization
from keras import optimizers

fashion_test = Flask(__name__)
fashion_test.config['JSON_AS_ASCII'] = False

global model
model = load_model('155-0.515946.h5', custom_objects={'BatchNormalization':BatchNormalization})

UPLOAD_FOLD = r'.\UPLOAD_FOLDER'
fashion_test.config['UPLOAD_FOLDER'] = r'.\UPLOAD_FOLDER'

categories = ["무드1-클래식","무드2-페미닌","무드3-레트로","무드4-히피","무드5-스포티","무드6-섹시","무드7-톰보이"]

# http://localhost:5000/
@fashion_test.route("/")
def main():
    return render_template("main.html")


def predict(filename):
    f = open(filename,'rb')
    # 이미지 resize
    X = []
    img = Image.open(f)
    img = img.convert("RGB")
    img = img.resize( (200, 200) )
    data = np.asarray(img)
    data = data.astype('float') / 255
    X.append(data)
    X = np.array(X)

    # 예측
    pred = model.predict(X)
    print(categories[0]+':'+str(pred[0][0]))
    print(categories[1]+':'+str(pred[0][1]))
    print(categories[2]+':'+str(pred[0][2]))
    print(categories[3]+':'+str(pred[0][3]))
    print(categories[4]+':'+str(pred[0][4]))
    print(categories[5]+':'+str(pred[0][5]))
    print(categories[6]+':'+str(pred[0][6]))

    #print(np.argmax(pred))    
    #return categories[np.argmax(pred)]
    return(res(pred))

def res(pred):
    a = {}
    for i in range (len(categories)):
        b=(categories[i])
        #b= b.encode('utf-8')
        #b= b.decode('unicode_escape')
        #b = b.decode('cp949').encode('utf-8')
        a[b]=str(pred[0][i]*100)

    return jsonify(a)


@fashion_test.route('/upload', methods=['GET', 'POST'])
def uploader_file():
    if request.method == 'POST':
        file = request.files['file']
        path = os.path.join(fashion_test.config['UPLOAD_FOLDER'], file.filename)
        file.save(path)
        print(path)
        return predict(path)
        #return 'file uploaded successfully'


if __name__ == "__main__":
    fashion_test.run(debug=True)
