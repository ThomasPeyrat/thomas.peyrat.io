---
title: Primer
eyebrow: Notes · in preparation
description: A short, simulation-first introduction to self-exciting point processes, from the Poisson process to stress testing.
---

A short introduction to self-exciting point processes, built on exact simulations that you can replay. Each chapter starts from a precise definition and ends with a figure you can manipulate.

Throughout, $(\Omega, \mathcal F, \mathbb P)$ is a probability space and $\mathcal N$ is a Poisson random measure on $\mathbb R_+ \times \mathbb R_+$ with intensity $dt\,d\theta$. Given a baseline $\mu > 0$ and a kernel $\varphi : \mathbb R_+ \to \mathbb R_+$ with $\|\varphi\|_{L^1} < 1$, the Hawkes process $X$ is the solution of

$$
X_t = \int_{(0,t] \times \mathbb R_+} \mathbf 1_{\{\theta \le \lambda(s)\}}\, \mathcal N(ds, d\theta),
\qquad
\lambda(t) = \mu + \int_{(0,t)} \varphi(t-s)\, dX_s .
$$

## Chapters

1. The homogeneous Poisson process
2. The inhomogeneous Poisson process and thinning
3. Hawkes processes and their cluster representation
4. The Poisson imbedding
5. Stress testing by simulation
