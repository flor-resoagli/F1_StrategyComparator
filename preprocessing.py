import pandas as pd
import numpy as np
import matplotlib.pyplot as plt


#Import datasets

# Before importing all SC/VSC or PITSTOP lapes were removed manually

def dataset_preprocessing():

    laptimes_2022 = pd.read_csv("data/2022_laptimes.csv")
    laptimes_2023 = pd.read_csv("data/2023_laptimes.csv")
    laptimes_2024 = pd.read_csv("data/2024_laptimes.csv")
    laptimes_2025 = pd.read_csv("data/2025_laptimes.csv")

    dataset = pd.concat([laptimes_2022, laptimes_2023, laptimes_2024, laptimes_2025])

    print("2022 initial dataset size: " + str(laptimes_2022.shape))
    print("2023 initial dataset size: " + str(laptimes_2023.shape))
    print("2024 initial dataset size: " + str(laptimes_2024.shape))
    print("2025 initial dataset size: " + str(laptimes_2025.shape))

    print("initial dataset size: " + str(dataset.shape))

    # Remove unnecessary columns

    dataset.drop("Driver", axis=1, inplace=True)

    dataset.drop("DriverNumber", axis=1, inplace=True)

    dataset.drop("Sector1Time", axis=1, inplace=True)

    dataset.drop("Sector2Time", axis=1, inplace=True)

    dataset.drop("Sector3Time", axis=1, inplace=True)

    dataset.drop("Stint", axis=1, inplace=True)

    dataset.drop("Team", axis=1, inplace=True)

    dataset.drop("Position", axis=1, inplace=True)

    # Dropped rows with NA values

    dataset.dropna(subset=["LapTime"], inplace=True)

    print("dataset size after initial cleanup: " + str(dataset.shape))
    
    # Add additional information about the circuits and races

    circuit_data = pd.read_csv("data/circuit_data.csv")

    # Circuit Length
    circuit_length = pd.Series(circuit_data.CircuitLength.values, index=circuit_data.Circuit).to_dict()

    dataset['CircuitLength'] = dataset['Circuit'].map(circuit_length)

    # Total Laps per race

    total_laps = pd.Series(circuit_data.TotalLaps.values, index=circuit_data.Circuit).to_dict()

    dataset['TotalLaps'] = dataset['Circuit'].map(total_laps)

    # Fuel By Lap

    lap_fuel = pd.Series(circuit_data.FuelByLap.values, index=circuit_data.Circuit).to_dict()

    dataset['FuelByLap'] = dataset['Circuit'].map(lap_fuel)

    # Race Distance

    race_distance = pd.Series(circuit_data.RaceDistance.values, index=circuit_data.Circuit).to_dict()

    dataset['RaceDistance'] = dataset['Circuit'].map(race_distance)

    # Average Speed

    average_speed = pd.Series(circuit_data.AverageSpeed.values, index=circuit_data.Circuit).to_dict()

    dataset['AverageSpeed'] = dataset['Circuit'].map(average_speed)

    # Corners

    corners = pd.Series(circuit_data.Corners.values, index=circuit_data.Circuit).to_dict()

    dataset['Corners'] = dataset['Circuit'].map(corners)

    # Traction

    traction = pd.Series(circuit_data.Traction.values, index=circuit_data.Circuit).to_dict()

    dataset['Traction'] = dataset['Circuit'].map(traction)

    # Braking

    braking = pd.Series(circuit_data.Braking.values, index=circuit_data.Circuit).to_dict()

    dataset['Braking'] = dataset['Circuit'].map(braking)

    # Lateral

    lateral = pd.Series(circuit_data.Lateral.values, index=circuit_data.Circuit).to_dict()

    dataset['Lateral'] = dataset['Circuit'].map(lateral)

    # Tyre Stress

    tyre_stress = pd.Series(circuit_data.TyreStress.values, index=circuit_data.Circuit).to_dict()

    dataset['TyreStress'] = dataset['Circuit'].map(tyre_stress)

    # Track Evolution

    track_evolution = pd.Series(circuit_data.TrackEvolution.values, index=circuit_data.Circuit).to_dict()

    dataset['TrackEvolution'] = dataset['Circuit'].map(track_evolution)

    # Asphalt Grip

    asphalt_grip = pd.Series(circuit_data.AsphaltGrip.values, index=circuit_data.Circuit).to_dict()

    dataset['AsphaltGrip'] = dataset['Circuit'].map(asphalt_grip)

    # Asphalt Abrasion

    asphalt_abrasion = pd.Series(circuit_data.AsphaltAbrasion.values, index=circuit_data.Circuit).to_dict()

    dataset['AsphaltAbrasion'] = dataset['Circuit'].map(asphalt_abrasion)

    # Downforce

    downforce = pd.Series(circuit_data.Downforce.values, index=circuit_data.Circuit).to_dict()

    dataset['Downforce'] = dataset['Circuit'].map(downforce)

    race_data = pd.read_csv("data/race_data.csv")

    # Max Temperature
    max_temperature = pd.Series(race_data.MaxTemperature.values, index=race_data.Code).to_dict()

    dataset['MaxTemperature'] = dataset['Code'].map(max_temperature)

    # Min Temperature
    min_temperature = pd.Series(race_data.MinTemperature.values, index=race_data.Code).to_dict()

    dataset['MinTemperature'] = dataset['Code'].map(min_temperature)

    # Average Temperature
    avg_temperature = pd.Series(race_data.AverageTemperature.values, index=race_data.Code).to_dict()

    dataset['AverageTemperature'] = dataset['Code'].map(avg_temperature)

    # Tyre Compound

    hard_tyres = pd.Series(race_data.HARD.values, index = race_data.Code+'HARD').to_dict()
    medium_tyres = pd.Series(race_data.MEDIUM.values, index=race_data.Code+'MEDIUM').to_dict()
    soft_tyres = pd.Series(race_data.SOFT.values, index=race_data.Code+'SOFT').to_dict()

    tyre_compounds = hard_tyres
    tyre_compounds.update(medium_tyres)
    tyre_compounds.update(soft_tyres)

    # remove rows with no compound value

    dataset.dropna(subset=["Compound"], inplace=True)
    dataset.dropna(subset=["TyreLife"], inplace=True)

    dataset['AuxCode'] = dataset['Code']+dataset['Compound']

    dataset['Tyre'] = dataset['AuxCode'].map(tyre_compounds)
    dataset.dropna(subset=["Tyre"], inplace=True)

    # remove auxiliary column
    dataset.drop("AuxCode", axis=1, inplace=True)

    # Calculate remaining fuel

    dataset['RemainingFuel'] = 1 - (dataset['LapNumber']-1)*dataset['FuelByLap']

    # Replace floats with int when necessary

    dataset['TyreLife'] = dataset['TyreLife'].astype(int)
    dataset['Tyre'] = dataset['Tyre'].astype(int)
    dataset['MaxTemperature'] = dataset['MaxTemperature'].astype(int)
    dataset['MinTemperature'] = dataset['MinTemperature'].astype(int)

    # Remove non numeric columns

    dataset.drop("Compound", axis=1, inplace=True)
    dataset.drop("Code", axis=1, inplace=True)

    circuit_ids = pd.Series(circuit_data.index+1 , index = circuit_data.Circuit).to_dict()

    print(circuit_ids)

    dataset['Circuit'] = dataset['Circuit'].map(circuit_ids)

    dataset["Minutes"] = dataset['LapTime'].str.slice(10, 12).astype(int)
    dataset["Seconds"] = dataset['LapTime'].str.slice(14, 19).astype(float)

    dataset['LapTime'] = dataset['Minutes']*60+dataset['Seconds']

    dataset.drop("Minutes", axis=1, inplace=True)
    dataset.drop("Seconds", axis=1, inplace=True)

    print("dataset size after full cleanup: " + str(dataset.shape))
    dataset.to_csv("generated/dataset.csv");

