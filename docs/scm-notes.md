# SCM Notes

## Merge Conflict Simulation and Resolution

### Scenario
A merge conflict was simulated by making overlapping edits between:
- `main`
- `feature/landing-page-footer-implementation`

The conflict occurred during integration when both branches contained changes touching the same target area.

### Resolution Steps Performed
1. Pulled the latest remote updates.
2. Merged the target branch into the active feature branch.
3. Located conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) in the affected file(s).
4. Manually reconciled both versions by keeping the intended footer implementation.
5. Removed conflict markers and validated the final file state.
6. Committed the resolved result.

### Outcome
- Conflict was resolved manually without discarding intended feature changes.
- Footer implementation remained intact after merge.
- Final merge commit history now reflects conflict resolution as part of SCM practice.

## Evidence
- Branch: `feature/landing-page-footer-implementation`
- Related commits include merge/conflict-resolution entries visible in `git log`.
