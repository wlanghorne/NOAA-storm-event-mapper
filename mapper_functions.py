from geojson import Point, LineString, Feature, FeatureCollection, dump
import csv
import os

def find_csv_files(path_to_dir, file_type=".csv"):
	file_names = os.listdir(path_to_dir)
	return [file_name for file_name in file_names if file_name.endswith(file_type)]

def path_has_csvs(path):
	if not os.path.isdir(path):
		return False
	else: 
		return find_csv_files(path)

def parse_csv_files(inputs_path, parse_path, state, event):
	input_names = find_csv_files(inputs_path)
	parse_file_path = os.path.join(parse_path,'NOAA_' + state + '_' + event + ".csv")

	# Create parse path if it doesn't exist 
	if not os.path.isdir(parse_path):
		os.mkdir(parse_path)

	# Write headers
	with open(parse_file_path, 'w', newline='') as f_write:
	    writer = csv.writer(f_write)
	    with open(os.path.join(inputs_path, input_names[0]), 'r', newline='') as f_read:
	        reader = csv.reader(f_read)
	        writer.writerow(next(reader))
	        f_read.close()
	    f_write.close()

	# Read data for all events 
	for input_name in input_names: 
	    with open(os.path.join(inputs_path, input_name), 'r', newline='') as f_read:
	        reader = csv.reader(f_read)
	        for row in reader:
	            if row[8] == state and row[12] == event:
	                  with open(parse_file_path, 'a', newline='') as f_append:
	                    appender = csv.writer(f_append)
	                    appender.writerow(row)
	                    f_append.close()
	    f_read.close()

# Creates a GeoJSON file using data from csv file 
def create_geojson(csv_path, geojson_path, geojson_file_path):

	# Create GeoJSON path if it doesn't exist 
	if not os.path.isdir(geojson_path):
		os.mkdir(geojson_path)

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
	        # property values 
	        scale = row[31]
	        narrative = row[49]
	        injuries = row[20] + row[21]
	        deaths = row[22] + row[23]
	        prop_damage = row[24]
	        date = row[0][4:] + '/' + row[1] + '/' + row[0][:4]
	        width = row[33]
	        year = row[10]
	        # create properties
	        properties = {"date" : date,
	        			  "scale": scale, 
	            		  "injuries": injuries,
	            		  "deaths": deaths,
	            		  "prop_damage": prop_damage,
	            		  "narrative": narrative,
	            		  "width" : width,
	            		  "year" : year}
	        narrative = row[49]
	        if lat1 and long1 and lat2 and long2:
	            line = LineString([[float(long1), float(lat1)], [float(long2), float(lat2)]])
	            features.append(Feature(geometry=line, properties= properties))
	        elif lat1 and long1:
	            line = LineString([[float(long1), float(lat1)], [float(long1), float(lat1)]])
	            features.append(Feature(geometry=line, properties= properties))
	        elif lat2 and long2:
	            line = LineString([[float(long2), float(lat2)], [float(long2), float(lat2)]])
	            features.append(Feature(geometry=line, properties= properties))
	    f.close()

	# add more features...
	# features.append(...)

	feature_collection = FeatureCollection(features)

	with open(geojson_file_path, 'w') as f:
		dump(feature_collection, f)

