import numpy as np

def get_employees_list():
	# gonna use hardcoding for now, later real database
	employees_list ="RUTIGLIANO, MICCOLI, MAROTTI, MASTRODONATO, MOLITERNI, LOCORRIERE, MARCHESANO, ROTOLO, MASTROROCCO, LONGOBUCCO, MONFREDA, MORGESE, LABANI, LAVARRA, COLUCCI, CENTRONE, DELFINE, VALERIO, PUGLIESE, GIAMPAOLO, DONGHIA, ALLEGRINI, CATINIELLO, ANDRIA, ANGELINI, NOTARNICOLA, CHIEPPA, MORAMARCO, CARBONARA, DE, MONTALBO, VITALE, GUSMAI, GRECO, ZITO, PERRONE, SIFANNO, LIUZZI, ANGELINI, CORMIO, PAPPALARDO, NETTI, PALMISANO, PANARO, GIAMPALMO, LISO, GIOIA, CAMPANELLA, LIUZZI, MARCHIONNA, GIUSTINO, NINIVAGGI, DIDONNA, PALMIROTTA, LEOGRANDE, PARISI, DAMMICCO, CONVERTINO, RELLA, ZECCHINO"
	employees = employees_list.split(" ,")
	# associate integer numner as id for each as on DB are recrodered
	## example return
	return {1: "RUTIGLIANO", 2: "MICCOLI", 3: "MARIOTTI"}


class NeuralNetwork():

	def __init__(self):
		random.seed(1)

if __name__ == "__main__":

	# simulate employees list getted from DB

	# ...

	# inputs set like id of employee from database
	# lets say for example to use 10 employees :
	employees_ids = np.unpackbits( 
		np.array([np.arange((10))], dtype=np.uint8).T
		, axis=1 ) 

	# as starting I will tinnk to make it simple as:
	# NeuralNetwork.train( [[0 0 0 0 0 0 1 1],[0 0 0 0 1 0 0 0]] , [[1, 0]] ) where 1 means "ON" and 0 means "OFF work" 

	print ( get_employees_list() )



