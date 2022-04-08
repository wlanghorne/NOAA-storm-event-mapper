from mapper_functions import path_has_csvs, parse_csv_files, create_geojson
import os
import sys

# Paths 
inputs_path = './inputs/'
parsed_path = './parsed/'
geojson_path = './GeoJSONs/'

# Default state for mapping = AR
state_to_map = 'ARKANSAS'

# Default event to map = tornadoes 
event_to_map = 'Tornado'


# Handle command line args 
arg_len = len(sys.argv)

# Change default state to map 
if arg_len == 2: 
	state_to_map = sys.argv[1]
elif arg_len == 3: 
	event_to_map = sys.argv[2]

# Check if folder contains inputs
if path_has_csvs(inputs_path):
	parse_csv_files(inputs_path, parsed_path, state_to_map, event_to_map)

parsed_csv_names = path_has_csvs(parsed_path)
if path_has_csvs(parsed_path):
	for parsed_csv_name in parsed_csv_names:
		create_geojson(os.path.join(parsed_path, parsed_csv_name), geojson_path, os.path.join(geojson_path, parsed_csv_name.replace('csv','geojson')))


else: 
	print('Put files for program to build into GeoJSON into parse folder or put input files into input folder')
