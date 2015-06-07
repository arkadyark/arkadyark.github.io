# Classes for each piece

class Piece(object):
    """Represents a piece in the game"""
    def __init__(self, prefix, initial_position, color):
        self.prefix = prefix
        self.initial_position = initial_position
        self.position = initial_position
        self.color = color
        self.captured = []

    def move(self, new_square):
        """move the piece from its current square"""
        self.position = new_square

    def capture(self, other_piece):
        """capture another piece"""
        self.captured.append(other_piece)

class Pawn(Piece):
    """class to represent a pawn"""
    def __init__(self, initial_position, color):
        super(Pawn, self).__init__('', initial_position, color)

class Rook(Piece):
    """class to represent a pawn"""
    def __init__(self, initial_position, color):
        super(Rook, self).__init__('R', initial_position, color)

class Knight(Piece):
    """class to represent a pawn"""
    def __init__(self, initial_position, color):
        super(Knight, self).__init__('N', initial_position, color)

class Bishop(Piece):
    """class to represent a pawn"""
    def __init__(self, initial_position, color):
        super(Bishop, self).__init__('B', initial_position, color)

class Queen(Piece):
    """class to represent a pawn"""
    def __init__(self, initial_position, color):
        super(Queen, self).__init__('Q', initial_position, color)

class King(Piece):
    """class to represent a pawn"""
    def __init__(self, initial_position, color):
        super(King, self).__init__('K', initial_position, color)
