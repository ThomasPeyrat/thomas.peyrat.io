---
title: Stress testing cyber losses
summary: Inject an adverse scenario into a self-exciting loss process and quantify how expected losses and their variability shift, on the same randomness as the baseline.
period: { start: 2024 }
collaborators: [Yousra Cherkaoui, Caroline Hillairet, Anthony Réveillac]
order: 3
---

## The question

Boards and regulators ask “what if” questions: what happens to the loss distribution if a cluster of critical vulnerabilities is disclosed, or if a large claim occurs now? For cyber risk, the answer depends on contagion: the scenario does not only add losses, it changes the rate of future events.

## The approach

We model cyber losses as multivariate self-exciting processes with dependencies, where vulnerability disclosures excite claims. A stress scenario is a set of deterministic events added to the process. Pseudo-chaotic decompositions and shifted-path operators give the explicit contribution of each scenario to quantities such as the expected surplus and its variance, which can be translated into stress-testing tools for practitioners. Future work extends these methods to climate-related and longevity risks, and to simulation-based inference for larger data sets.
