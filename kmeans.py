import json
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from pandas import DataFrame
import pprint


def read_file():
    with open('scripts/features.json') as f:
        data = json.load(f)
    return data


def main():
    songs = read_file()
    feature_groups = []
    for i in songs['audio_features']:
        feature_groups.append(
        [i['energy'], i['danceability'], i['speechiness'] * 10, i['acousticness'],
         i['liveness'], i['valence'], i['loudness'] / 10, i['instrumentalness'], i['tempo'] / 200]
        )
        print(i['uri'])

    Kmean = KMeans(n_clusters=2)
    pred = Kmean.fit_predict(feature_groups)

    print(pred)
    for i in feature_groups:
        print(i)


if __name__== "__main__":
    main()



'''
K meanns
    
    
    
song_features = []
    for i in songs['audio_features']:
        song_features.append([i['uri'], i['key'], i['energy'], i['danceability'], i['speechiness'], i['acousticness'],
                        i['liveness'], i['valence'], i['loudness'], i['instrumentalness'], i['tempo']/100])

    song_features_train_full_data = song_features[:len(song_features)//2]
    song_features_train_full_data['genre'] = ['rock', 'chill', 'classical', 'classical', 'classical', 'classical', 'classical', 'classical', 'classical', 'classical']

    song_features_train = [i[1:] for i in song_features[:len(song_features)//2]]
    song_features_test = [i[1:] for i in song_features[len(song_features)//2:]]

    song_features_train = DataFrame.from_records(song_features_train)
    print(fast_distances(song_features_test[0], song_features_train))
    
    def distance(features1, features2):
    """The Euclidean distance between two arrays of feature values."""
    return np.sqrt(sum((features1 - features2)**2))

def fast_distances(test_row, train_table):
    """An array of the distances between test_row and each row in train_rows.

    Takes 2 arguments:
      test_row: A row of a table containing features of one
        test song (e.g., test_20.row(0)).
      train_table: A table of features (for example, the whole
        table train_20)."""
    counts_matrix = np.asmatrix(train_table.columns).transpose()
    diff = np.tile(np.array(test_row), [counts_matrix.shape[0], 1]) - counts_matrix
    np.random.seed(0) # For tie breaking purposes
    distances = np.squeeze(np.asarray(np.sqrt(np.square(diff).sum(1))))
    eps = np.random.uniform(size=distances.shape)*1e-10 #Noise for tie break
    distances = distances + eps
    return distances
'''

