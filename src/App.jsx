import { useState } from 'react'
import Flashcard from './components/Flashcard'
import './App.css'

function App() {

  let questions = [
    {id: 1,
      question:"What is the difference between supervised and unsupervised learning?",
      answer: "Supervised learning trains on labeled data (input → known output). Unsupervised learning finds hidden patterns in unlabeled data. Examples: regression/classification (supervised) vs. clustering/PCA (unsupervised)",
      accepted: ["supervised", "unsupervised", "labeled", "labelled", "unlabeled"]
     },
     {id: 2,
      question:"What is overfitting, and how can you prevent it?",
      answer: "Overfitting is when a model learns the training data too well, including noise, and fails to generalize to new data. Prevention: more data, cross-validation, regularization (L1/L2), dropout, early stopping",
      accepted: ["overfitting", "noise", "generalize", "regularization", "dropout"]
     },
     {id: 3,
      question:"What is the bias-variance tradeoff?",
      answer: "Bias = error from wrong assumptions (underfitting). Variance = error from sensitivity to training data (overfitting). Reducing one tends to increase the other. Goal: find the sweet spot that minimizes total error",
      accepted: ["bias", "variance", "underfitting", "overfitting", "tradeoff"]
     },
     {id: 4,
      question:"What is a training set, validation set, and test set?",
      answer: "Training set: used to fit the model. Validation set: used to tune hyperparameters. Test set: used to evaluate final, unbiased performance. Common split: 70% train / 15% val / 15% test",
      accepted: ["training", "validation", "test", "hyperparameters", "split"]
     },
     {id: 5,
      question:"What is gradient descent?",
      answer: "An optimization algorithm that iteratively adjusts model parameters in the direction that minimizes the loss function, using the gradient (slope) as a guide. Variants: batch, stochastic (SGD), and mini-batch gradient descent",
      accepted: ["gradient descent", "optimization", "minimize", "loss", "sgd"]
     },
     {id: 6,
      question:"What is a loss function?",
      answer: "A function that measures how far a model's predictions are from the actual values. The model is trained to minimize this value. Common ones: MSE (regression), cross-entropy (classification)",
      accepted: ["loss", "error", "predictions", "minimize", "mse", "cross-entropy"]
     },
     {id: 7,
      question:"What is regularization and why is it used?",
      answer: "Regularization adds a penalty to the loss function for large model weights, discouraging complexity and reducing overfitting. L1 (Lasso) promotes sparsity; L2 (Ridge) shrinks weights toward zero",
      accepted: ["regularization", "penalty", "overfitting", "lasso", "ridge", "l1", "l2"]
     },
     {id: 8,
      question:"What is the difference between classification and regression?",
      answer: "Classification predicts a discrete category (e.g., spam or not spam). Regression predicts a continuous numerical value (e.g., house price). Both are supervised learning tasks",
      accepted: ["classification", "regression", "discrete", "continuous", "category"]
     },
     {id: 9,
      question:"What is a hyperparameter?",
      answer: "A configuration setting for the learning algorithm itself — set before training, not learned from data. Tuned manually or via search. Examples: learning rate, number of hidden layers, number of trees in a forest",
      accepted: ["hyperparameter", "configuration", "learning rate", "before training", "tuned"]
     },
     {id: 10,
      question:"What is cross-validation?",
      answer: "A technique to evaluate model performance by splitting the data into k folds, training on k-1 folds, and testing on the remaining fold, repeated k times. k-fold cross-validation reduces dependency on a single train/test split",
      accepted: ["cross-validation", "cross validation", "k folds", "k-fold", "folds"]
     }
  ];

  return (
    <div className="contentContainer">
      <h1 className="Title">Machine Learning Basics</h1>
      <div className="description">
        <p>How well do you know your machine learning basics?</p>
        <p>Cards: {questions.length}</p>
      </div>
      <Flashcard questions={questions} />
    </div>
  )
}

export default App
