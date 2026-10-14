---
title: Malliavin calculus on Poisson space
summary: Add one point to the Poisson measure and follow how the whole path moves. This difference operator gives representation formulas without compensator, and explicit sensitivities.
period: { start: 2023 }
collaborators: [Caroline Hillairet, Anthony Réveillac]
order: 2
---

## The setting

Let $\mathcal N$ be a Poisson random measure on $\mathbb X = \mathbb R_+ \times \mathbb R_+$ with intensity $dt\,d\theta$, defined on a probability space $(\Omega, \mathcal F, \mathbb P)$. Self-exciting processes can be written as functionals of $\mathcal N$ through the Poisson imbedding: a point $(t, \theta)$ of $\mathcal N$ becomes an event exactly when $\theta \le \lambda(t^-)$.

For a functional $F$ of $\mathcal N$ and a point $x \in \mathbb X$, the add-one-cost operator is

$$
D_x F = F(\mathcal N + \delta_x) - F(\mathcal N).
$$

## The approach

Working with this operator rather than with a compensated integral, we obtain a Clark–Ocone type representation for any integrable functional of the Poisson random measure. Applied to self-exciting processes, it yields expressions for expectations, covariances and, more generally, functionals of shifted paths: sensitivities and scenario impacts that are both rigorous and aligned with risk-management practice.
