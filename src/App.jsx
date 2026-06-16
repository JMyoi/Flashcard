import { useState } from 'react'
import Flashcard from './components/Flashcard'
import './App.css'

function App() {

  let questions = [
    {question:"What is the difference between supervised and unsupervised learning?",
      answer: "Supervised learning trains on labeled data (input → known output). Unsupervised learning finds hidden patterns in unlabeled data. Examples: regression/classification (supervised) vs. clustering/PCA (unsupervised)"
     },
     {question:"What is overfitting, and how can you prevent it?",
      answer: "Overfitting is when a model learns the training data too well, including noise, and fails to generalize to new data. Prevention: more data, cross-validation, regularization (L1/L2), dropout, early stopping"
     },
     {question:"What is the bias-variance tradeoff?",
      answer: "Bias = error from wrong assumptions (underfitting). Variance = error from sensitivity to training data (overfitting). Reducing one tends to increase the other. Goal: find the sweet spot that minimizes total error"
     },
     {question:"What is a training set, validation set, and test set?",
      answer: "Training set: used to fit the model. Validation set: used to tune hyperparameters. Test set: used to evaluate final, unbiased performance. Common split: 70% train / 15% val / 15% test"
     },
     {question:"What is gradient descent?",
      answer: "An optimization algorithm that iteratively adjusts model parameters in the direction that minimizes the loss function, using the gradient (slope) as a guide. Variants: batch, stochastic (SGD), and mini-batch gradient descent"
     },
     {question:"What is a loss function?",
      answer: "A function that measures how far a model's predictions are from the actual values. The model is trained to minimize this value. Common ones: MSE (regression), cross-entropy (classification)"
     },
     {question:"What is regularization and why is it used?",
      answer: "Regularization adds a penalty to the loss function for large model weights, discouraging complexity and reducing overfitting. L1 (Lasso) promotes sparsity; L2 (Ridge) shrinks weights toward zero"
     },
     {question:"What is the difference between classification and regression?",
      answer: "Classification predicts a discrete category (e.g., spam or not spam). Regression predicts a continuous numerical value (e.g., house price). Both are supervised learning tasks"
     },
     {question:"What is a hyperparameter?",
      answer: "A configuration setting for the learning algorithm itself — set before training, not learned from data. Tuned manually or via search. Examples: learning rate, number of hidden layers, number of trees in a forest"
     },
     {question:"What is cross-validation?",
      answer: "A technique to evaluate model performance by splitting the data into k folds, training on k-1 folds, and testing on the remaining fold — repeated k times. k-fold cross-validation reduces dependency on a single train/test split"
     }
  ];

  return (
    <div>
      <h1> Machine Learning Basics</h1>
      <p>How well you know your machine learning basics?</p>
      <p>Number of Cards: {questions.length}</p>
      <div>
        <Flashcard questions = {questions}/>
      </div>
    </div>
  )
}

export default App
