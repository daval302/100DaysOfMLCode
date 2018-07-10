import numpy as np

class NeuralNetwork():

	def __init__(self):
		random.seed(1)

if __name__ == "__main__":

	# inputs set like id of employee from database
	# lets say for example to use 10 employees :
	employees_ids = np.unpackbits( 
		np.array([np.arange((10))], dtype=np.uint8).T
		, axis=1 ) 

	# as starting I will tinnk to make it simple as:
	# NeuralNetwork.train( [[0 0 0 0 0 0 1 1],[0 0 0 0 1 0 0 0]] , [[1, 0]] ) where 1 means "ON" and 0 means "OFF work" 

	print ( employees_ids )



