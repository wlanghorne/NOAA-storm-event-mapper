from NOAA_cat_functions import find_csv_files
import csv

# Get raw csv files
events_folder_path = '/Users/williamlanghorne/Desktop/news_scripts/inputs/NOAA_files/Events_by_year/'
file_paths = find_csv_files(events_folder_path)

# Path to final write file 
final_file_path = '/Users/williamlanghorne/Desktop/news_scripts/outputs/NOAA_files/NOAA_final/NOAA_final.csv'

# Write headers 
with open(final_file_path, 'w', newline='') as f_write:
    writer = csv.writer(f_write)
    with open(events_folder_path+file_paths[0], 'r', newline='') as f_read:
        reader = csv.reader(f_read)
        writer.writerow(next(reader))
        f_read.close()
    f_write.close()

# Read data for all Arkansas events 
for file_path in file_paths: 
    with open(events_folder_path+file_path, 'r', newline='') as f_read:
        reader = csv.reader(f_read)
        for row in reader:
            if row[8] == 'ARKANSAS' and row[12] == 'Tornado':
                  with open(final_file_path, 'a', newline='') as f_append:
                    appender = csv.writer(f_append)
                    appender.writerow(row)
                    f_append.close()
    f_read.close()