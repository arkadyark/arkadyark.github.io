import json
from pieces import *

f = file('/Users/arkadyark/Google Drive/Code/chess_stats/millionbase.txt')
# For testing
#f = file('/Users/arkadyark/Google Drive/Code/chess_stats/small.txt')

pawn = Pawn('a2', False)

possible_results = ('0-1', '1-0', '1/2-1/2')

class Game(object):
    """Class to represent the game"""
    def __init__(self):
        self.meta = {}
        self.game = []

    def add_move(self, move):
        """add a new move"""
        self.game.append(move)

    def add_meta(self, tag, data):
        """add a new piece of metadata"""
        self.meta[tag] = data

    def print_game(self):
        print 'Meta:'
        for metadata in self.meta:
            print metadata + ': ' + self.meta[metadata]
        print 'Game:'
        for move in self.game:
            print move

    def initialize_game_state(self):
        """make a new game board"""
        return []

    def analyze_game(self, game_stats):
        """analyzes the game and adds the results to game_stats"""
        game_state = self.initialize_game_state()
        
if __name__ == '__main__':
    # File alternates between metadata and game data
    game = False
    count = 0
    game_stats = []
    current_game = Game()
    # Go through the game line by line
    for line in f:
        if line.startswith('\r\n'): # damn carriage returns
            if game:
                #current_game.print_game()
                # Analyze the finished game
                current_game.analyze_game(game_stats)
                # New game started
                current_game = Game()
            game = not game
            count += 1
            if not count % 50000:
                print count
            continue

        if game:
            # Goes in patterns of three - move number, white move, black move
            # Special case - end of the game
            split_line = line.strip().split(' ')
            for i in range(0, len(split_line), 3):
                if split_line[i] in possible_results:
                    continue
                try:
                    if split_line[i + 2] in possible_results:
                        # Weird case, white has the last move
                        current_game.add_move(split_line[i + 1])
                        continue
                except:
                    continue
                # White move
                current_game.add_move(split_line[i + 1])
                # Black move
                current_game.add_move(split_line[i + 2])

        else:
            # Dealing with metadata, add this to the game
            split_line = line[1:-2].split('"')[:-1]
            current_game.add_meta(split_line[0].strip(), split_line[1])

