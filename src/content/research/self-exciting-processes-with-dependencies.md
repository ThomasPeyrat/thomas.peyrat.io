---
title: Self-exciting processes with dependencies
summary: A general class of multivariate self-exciting processes in which the size of an event feeds the rate of the next ones, so that frequency and severity are no longer independent.
period: { start: 2023 }
collaborators: [Caroline Hillairet, Anthony Réveillac]
order: 1
---

## The question

In classical actuarial models, claims arrive independently: an event has no memory of the past. Event-driven risks such as cyber incidents do not behave this way. One incident triggers others, across time, business units or entities, and the size of an event shapes how likely the next ones are.

## The approach

My doctoral work develops a general framework for multivariate self-exciting processes with dependencies (MSPD). It captures interactions across several components, for instance cyber events across entities or climate shocks across regions, while keeping the quantities of interest tractable. Each component $i$ has an intensity $\lambda^i$ that may depend on the whole past of the process, including the marks (severities) of past events, which creates a frequency–severity dependency absent from standard Hawkes processes.
