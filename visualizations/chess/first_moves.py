import json

f = file('/Users/arkadyark/Google Drive/Code/chess_stats/millionbase.txt')
# For testing
#f = file('/Users/arkadyark/Google Drive/Code/chess_stats/small.txt')

results_map = {'1-0' : 1, '1/2-1/2' : 0, '0-1' : -1, '*' : 0}
white_move_results = {
        # Opening with pawns
        'a2' : {'a3' : {}, 'a4' : {}},
        'b2' : {'b3' : {}, 'b4' : {}},
        'c2' : {'c3' : {}, 'c4' : {}},
        'd2' : {'d3' : {}, 'd4' : {}},
        'e2' : {'e3' : {}, 'e4' : {}},
        'f2' : {'f3' : {}, 'f4' : {}},
        'g2' : {'g3' : {}, 'g4' : {}},
        'h2' : {'h3' : {}, 'h4' : {}},

        # Opening with knights
        'b1' : {'Na3' : {}, 'Nc3' : {}},
        'g1' : {'Nf3' : {}, 'Nh3' : {}}
}

black_move_results = {
        # Opening with pawns
        'a7' : {'a6' : {}, 'a5' : {}},
        'b7' : {'b6' : {}, 'b5' : {}},
        'c7' : {'c6' : {}, 'c5' : {}},
        'd7' : {'d6' : {}, 'd5' : {}},
        'e7' : {'e6' : {}, 'e5' : {}},
        'f7' : {'f6' : {}, 'f5' : {}},
        'g7' : {'g6' : {}, 'g5' : {}},
        'h7' : {'h6' : {}, 'h5' : {}},

        # Opening with knights
        'b8' : {'Na6' : {}, 'Nc6' : {}},
        'g8' : {'Nf6' : {}, 'Nh6' : {}}
}

white_results = {}
black_results = {}

count = 0

result = None
for line in f:
    # Print out some progress
    # Friendly message to future self, there are about 39 million lines
    #if not count % 1000000:
    #    print count
    #count += 1

    if line[:3] == '1. ':
        # Dealing with a first move
        splitMove = line.split(' 2. ')[0].split()[1:]
        whiteMove = splitMove[0]
        blackMove = splitMove[1]
        
        # Add to our results dict
        if not whiteMove in white_results:
            white_results[whiteMove] = {'wins' : 0, 'draws' : 0, 'losses' : 0}
        if not blackMove in black_results:
            black_results[blackMove] = {'wins' : 0, 'draws' : 0, 'losses' : 0}

        if result == 1:
            white_results[whiteMove]['wins'] += 1
            black_results[blackMove]['losses'] += 1
        if result == 0:
            white_results[whiteMove]['draws'] += 1
            black_results[blackMove]['draws'] += 1
        if result == -1:
            white_results[whiteMove]['losses'] += 1
            black_results[blackMove]['wins'] += 1

    elif line[:8] == '[Result ':
        # Dealing with the result of a game
        result = results_map[line.split('"')[1]]

for result in white_results:
    for possible_results in white_move_results:
        if result in white_move_results[possible_results]:
            white_move_results[possible_results][result] = white_results[result]
            break

for result in black_results:
    for possible_results in black_move_results:
        if result in black_move_results[possible_results]:
            black_move_results[possible_results][result] = black_results[result]
            break

print json.dumps({'white' : white_move_results, 'black' : black_move_results})
