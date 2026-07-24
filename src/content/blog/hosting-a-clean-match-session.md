---
title: Hosting a Clean Match Session
description: Multiplayer rounds feel smoother when setup decisions are locked early and the host flow stays consistent.
pubDate: 2026-04-10
authors:
  - shravan
tags:
  - Multiplayer
  - Setup
---

Reaktor works best when the session setup is clear before players start joining. A few simple habits remove most friction.

## Start with one clear host

Only one device should host the match. The host waits for joins and starts the game once the player count is ready.

That flow works best when everyone agrees up front on:

- player count
- board size
- who is hosting

If those decisions keep changing while people are joining, the session feels broken even when the code is fine.

## Keep device behavior stable

Joining is smoother when everyone keeps a consistent flow during setup:

- avoid switching apps repeatedly while joining
- wait for the host to confirm player count before retrying
- keep the host device active until the match starts

## Pick the board before the room fills

The host sends rows, columns, and player count at match start. Sessions are cleaner when format decisions happen before the join flow fills up.

Good defaults:

- `6 x 5` for fast warm-up rounds
- `9 x 6` for balanced sessions
- `12 x 8` for longer tables that want real reversals

## When something looks wrong

If a player cannot see the host or a room never starts, capture the details that matter:

- whether the issue happened while joining or after confirmation
- the selected board size
- expected player count versus connected player count
- a screenshot of the session screen

Those are the same details that make GitHub issues much easier to reproduce later.
