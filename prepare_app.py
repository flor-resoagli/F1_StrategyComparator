import pandas as pd
import joblib
import preprocessing
import load_models

# prepare dataset

#preprocessing.dataset_preprocessing()

dataset = pd.read_csv("generated/dataset.csv")
print(list(dataset.columns))  
dataset.drop(dataset.columns[0], axis=1, inplace=True)
print(list(dataset.columns))   
#prepare models
#load_models.linear_regression(dataset)
#load_models.random_forest(dataset)
#load_models.gradient_boosting(dataset)
#load_models.xgboost(dataset)

# model = joblib.load("generated/lr_model.pkl")

model = joblib.load("generated/rf_model.pkl")

# model = joblib.load("generated/gb_model.pkl")

# model = joblib.load("generated/xgb_model.pkl")