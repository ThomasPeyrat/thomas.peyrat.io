---
# DRAFT — written by Claude from the research angle you described for the postdoc. Rewrite freely.
title: Generative AI for finance
summary: Generative models for event-driven data. Malliavin calculus on Poisson space supplies the score of a jump process, the object a diffusion-type generative model learns.
period: { start: 2026 }
collaborators: [Huyên Pham]
order: 4
---

## The question

Score-based generative models learn to sample from a distribution known only through data, by estimating the gradient of its log-density. The theory is written for paths driven by Brownian motion. Financial and insurance data are full of jumps (defaults, claims, order arrivals, cyber incidents), for which that gradient is not even defined.

## The setting

Let $\mathcal N$ be a Poisson random measure on $\mathbb X = \mathbb R_+ \times \mathbb R_+$ with intensity $dt\,d\theta$, on a probability space $(\Omega, \mathcal F, \mathbb P)$, and let $X$ be a point process written as a functional of $\mathcal N$ through the Poisson imbedding. On this space the natural derivative of a functional $F$ is the add-one-point operator

$$
D_x F = F(\mathcal N + \delta_x) - F(\mathcal N), \qquad x \in \mathbb X .
$$

## The approach

The aim is to use this operator, and the non-compensated Clark–Ocone representation built on it, to define score functions for point processes, learn them from data, and sample new event-driven trajectories. This work is in progress within the AIDA-F chair at CMAP.
