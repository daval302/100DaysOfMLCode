import numpy as np

class NeuralNetwork():

	def __init__(self):
		np.random.seed(1)
		# data to be query from DB
		self.employees = self.getEmployees()
		# input variables
		self.alpha = 0.1
		self.input_dim = 2
		self.hidden_dim = 16
		self.output_dim = 1
		# initialize neural network weight
		syn_0 = 2 * np.random.random((self.input_dim, self.hidden_dim)) -1
		syn_1 = 2 * np.random.random((self.hidden_dim, self.output_dim)) - 1
		syn_h = 2 * np.random.random((self.hidden_dim, self.hidden_dim)) -1

		syn_0_update = np.zeros_like(syn_0)
		syn_1_update = np.zeros_like(syn_1)
		syn_h_update = np.zeros_like(syn_h)

	def getEmployees(self):
		# gonna use hardcoding for now, later real database
		employees_list ="RUTIGLIANO, MICCOLI, MAROTTI, MASTRODONATO, MOLITERNI, LOCORRIERE, MARCHESANO, ROTOLO, MASTROROCCO, LONGOBUCCO, MONFREDA, MORGESE, LABANI, LAVARRA, COLUCCI, CENTRONE, DELFINE, VALERIO, PUGLIESE, GIAMPAOLO, DONGHIA, ALLEGRINI, CATINIELLO, ANDRIA, ANGELINI, NOTARNICOLA, CHIEPPA, MORAMARCO, CARBONARA, DE, MONTALBO, VITALE, GUSMAI, GRECO, ZITO, PERRONE, SIFANNO, LIUZZI, ANGELINI, CORMIO, PAPPALARDO, NETTI, PALMISANO, PANARO, GIAMPALMO, LISO, GIOIA, CAMPANELLA, LIUZZI, MARCHIONNA, GIUSTINO, NINIVAGGI, DIDONNA, PALMIROTTA, LEOGRANDE, PARISI, DAMMICCO, CONVERTINO, RELLA, ZECCHINO"
		employees = employees_list.split(", ")
		ritorno = dict(  zip( range( len(employees) ), employees ) )
		# associate integer numner as id for each as on DB are recrodered
		# but I need to produce and input like : [[0 0 0 0 0 0 1 1], [0,0,1,0,0,0,0] ]
		## the second argument input represent the day of the week : 1 on the week position array

		return ritorno

	#def getSynapses(self):
		# synapses are will be stored into DB
		# this is hardcoding



if __name__ == "__main__":

	# simulate employees list getted from DB

	# inputs set like id of employee from database
	# lets say for example to use 10 employees :
	employees_ids = np.unpackbits( 
		np.array([np.arange((10))], dtype=np.uint8).T
		, axis=1 ) 

	# as starting I will tinnk to make it simple as:
	""" 
	NeuralNetwork.train( 
			##ID##			##DAY_WEEK##
		[[0 0 0 0 0 0 1 1], [0,0,1,0,0,0,0] ], # imput_dim = 2
		[0|1] # output_dim = 1 ; where 1 means "ON" and 0 means "OFF work"  
		) 


	"""

	n = NeuralNetwork()
	print(n.employees)



