from os import listdir

def find_csv_files(path_to_dir, suffix=".csv"):
  filenames = listdir(path_to_dir)
  return [filename for filename in filenames if filename.endswith(suffix)]