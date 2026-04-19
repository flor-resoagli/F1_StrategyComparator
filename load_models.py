from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.ensemble import GradientBoostingRegressor
import xgboost as xgb
import lightgbm as lgb

import joblib

def correlation(dataset):

    print("Find most important features relative to target")
    corr = dataset.corr()
    corr.sort_values(["LapTime"], ascending = False, inplace = True)
    print(corr.LapTime)

def linear_regression(dataset):
    X = dataset.drop(columns = ["LapTime"])
    y = dataset["LapTime"].values
    y = y.astype('float')

    X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=78)

    model = LinearRegression()
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    print('Linear Regression MSE:', mean_squared_error(y_test, y_pred))

    joblib.dump(model, 'generated/lr_model.pkl')

def random_forest(dataset):
    X = dataset.drop(columns = ["LapTime"])
    y = dataset["LapTime"].values
    y = y.astype('float')

    X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=78)

    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    y_pred_rf = model.predict(X_test)
    mse_rf = mean_squared_error(y_test, y_pred_rf)
    print('Random Forest MSE:', mse_rf)

    joblib.dump(model, 'generated/rf_model.pkl')

def gradient_boosting(dataset):
    X = dataset.drop(columns = ["LapTime"])
    y = dataset["LapTime"].values
    y = y.astype('float')

    X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=78)

    model = GradientBoostingRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    y_pred_gb = model.predict(X_test)
    mse_gb = mean_squared_error(y_test, y_pred_gb)
    print('Gradient Boosting MSE:', mse_gb)

    joblib.dump(model, 'generated/gb_model.pkl')

def xgboost(dataset):
    X = dataset.drop(columns = ["LapTime"])
    y = dataset["LapTime"].values
    y = y.astype('float')

    X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=78)

    model = xgb.XGBRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    y_pred_xgb = model.predict(X_test)
    mse_xgb = mean_squared_error(y_test, y_pred_xgb)
    print('XGBoost MSE:', mse_xgb)

    joblib.dump(model, 'generated/xgb_model.pkl')

def lightgbm(dataset):
    X = dataset.drop(columns = ["LapTime"])
    y = dataset["LapTime"].values
    y = y.astype('float')

    X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=78)

    model = lgb.LGBMRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    y_pred_lgb = model.predict(X_test)
    mse_lgb = mean_squared_error(y_test, y_pred_lgb)
    print('LightGBM MSE:', mse_lgb)

    joblib.dump(model, 'generated/lgb_model.pkl')