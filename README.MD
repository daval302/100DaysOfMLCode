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

### Day 5: 10 July, 2018

Let's think about the data : employees shifts has to be distrubuited over the week and the first *employee requirement* is the ammount of hours that everyone is committed to do every week by contract.

**Done** :

* imported two examples for Neural Network from [Siraj Raval repositories](https://github.com/llSourcell?tab=repositories)
* started the `example.py` where test some neural network before applying it to a client side **ML** framework
* settled up the simpliest data set and output 

**Thoughts**

* Figure out how to represent data to put in the **ML**
* Choose the **ML** algorithm that suits best.
* Choose the library/framework to use
	* I am thinking to implement **ML** in client side by `javascript`

**Link(s) to work**
[StMath Rota Managment System](https://daval302.github.io/100DaysOfMLCode)
