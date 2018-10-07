# 100 Days Of ML Code

## Intro

This app is based on a real project for a Care Home based in England. The main feaature as starting is a web app able to give the manager stuff of the company to manage the Rota (employees shifts on week or month basis).

As starting we have the main Skateholder : *Memmber of the managemment staff*, as we call from now till forever **Rota Administrator**.

The *Rota Administrator* sets the working hours for each employee on week basis, keeping mind the **employees requirements** that will be developed in second time. 

Each shift will be assign to an employee withing a **slot of `n` hours**. So for example, this is a shift as it will look like:

```json
{
	"id": 3,
	"date": "2018-06-03",
	"slot": "9-17",
	"note": "As the employee requested"
}
```

The above sihft is a *8 hours shift*.

## How **ML** come to help the *Rota Administrator* ??

Completing and sugesting shift assignments, based on previous *rotas* and *employees requirements* so that it will predict next week rota, making the life of *Rota Administrator* useless `LOL`. 

### Day 0: July 6, 2018

* Importing necessary code for client side: `jQuery`, `AngularJs`
* Draft Login view
* Draft Debugging view
* Login process sending credentials by `$http` 
* Login vars settlement with a new *accessToken*

### Day 5: July 10, 2018

Let's think about the data : employees shifts has to be distrubuited over the week and the first *employee requirement* is the ammount of hours that everyone is committed to do every week by contract.

**Done** :

* imported two examples for Neural Network from [Siraj Raval repositories](https://github.com/llSourcell?tab=repositories)
* started the `example.py` where test some neural network before applying it to a client side **ML** framework
* settled up the simpliest data set and output 

### Day 6: July 11 2018

* `example.py` setting up harcoding functions for testing data, no DB record

### Day 9: July 14 2018

* Chosen basic data format for for I/O rapresented in a `example.py`

### Day 10: July 15 2018 

Tasks today:

* [x] doing some practice with [MathJs extension for javascript](mathjs.org/) to implements the *Math* behind the ML algorithm
* [x] complete the RNN in example.py adapted for the the specific use case (adapted imput data)
	* [x] Simplified mode : `imput_dim = 2` and `output_dim=1`

### Day 11: July 16 2018

* [x] Populate DB with employees list
* [ ] Populate 5 weeks shifts from real data
* [ ] Extract data for I/O simplified **ML** model in order to test the **RNN**
* [x] Admin View
	* [x] Employees List
	* [x] Shift table (only DB reading, no editable)

### Day 12: July 17 2018

* [x] Reviewing incompleted tasks of previous day and forward for next day

### Day 13: July 18 2018

* Fixed common headers for post-login
* Settled up parametres for addshift table 

### Day 14: July 19 2018

* [x] set the *AngularJs* service *$NeruralNetwork* to implement the *NeuralNetwork* class in `python` 

### Day 19: July 24 2018

* Settled app.js and slitted Controllers and Services into separed files

### Status

* Exporting into Angular 6

## **Thoughts**

* [x] Figure out how to represent data to put in the **ML**
* [x] Choose the **ML** algorithm that suits best.
* [x] Choose the library/framework to use
	* Implement **ML** in client side by in 'neuralNetwork' Angular Serice and integrated into master

**Link(s) to work**
[StMath Rota Managment System](https://daval302.github.io/100DaysOfMLCode)
