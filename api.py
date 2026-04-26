from flask import Flask, request, jsonify
import pandas as pd
from prepare_app import dataset
from prepare_app import model

from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

@app.route("/")
def hello():
    return "Welcome to machine learning model APIs!"

@app.route("/columns")
def columns():
    return list(dataset.columns)

@app.route("/drop-column")
def dropcolumns():  
    dataset.drop(dataset.columns[0], axis=1, inplace=True)
    return list(dataset.columns)

@app.route("/predict", methods=['POST'])
def predict():
     json_ = request.json
     print(json_)
     query_df = pd.DataFrame(json_)
     query = pd.get_dummies(query_df)
     prediction = model.predict(query)
     return jsonify({'prediction': list(prediction)})

if __name__ == '__main__':
    app.run(debug=True)
