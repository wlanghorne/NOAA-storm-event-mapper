from geojson import Point, LineString, Feature, FeatureCollection, dump
import csv
import numpy as np

# Get raw csv files
csv_path = '/Users/williamlanghorne/Desktop/news_scripts/outputs/NOAA_files/NOAA_final/NOAA_final.csv'

# Store line elements
features = []
with open(csv_path, 'r', newline='') as f:
   reader = csv.reader(f)
   next(reader)
   for row in reader:
      # check values
      lat1 = row[44]
      long1 = row[45]
      lat2 = row[46]
      long2 = row[47]
      if lat1 and long1 and lat2 and long2:
         line = LineString([[float(long1), float(lat1)], [float(long2), float(lat2)]])
         features.append(Feature(geometry=line, properties={"storm": "Tornado"}))
      elif lat1 and long1:
         point = Point([float(long1), float(lat1)])
         features.append(Feature(geometry=point, properties={"storm": "Tornado"}))
   f.close()

# add more features...
# features.append(...)

feature_collection = FeatureCollection(features)

with open('tornadoes.geojson', 'w') as f:
   dump(feature_collection, f)