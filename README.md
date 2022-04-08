# NOAA-tornado-mapper

NOAA tornado mapper processes NOAA storm data into a format that can be used for map making. 

The script iterates through a csv file of NOAA storm data and outputs a GeoJSON file. The GeoJSON file includes lines connecting the start and end coordinates for each tornado. Entries for tornadoes that only include a start coordinate are represented as points. The line and point features for each tornado include data (severity, damage, etc). 
