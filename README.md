# NOAA-storm-event-mapper

NOAA storm event mapper processes storm data collected by [NOAA](https://www.ncdc.noaa.gov/stormevents/) since 1950 into a format that can be used for map making. 

The program takes inputs in the form of csv files with yearly data downloaded from the NOAA site and outputs a parsed file based on command line arguments (which state and which event to filter for). The script then iterates through the parsed file and outputs a GeoJSON file. The GeoJSON file includes lines connecting the start and end coordinates for each event. Entries for tornadoes that only include a start coordinate are represented as points. The line and point features for each tornado include data (severity, damage, etc). 
